import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
mongodb_uri = os.getenv("MONGODB_URI")
api_url = os.getenv("API_URL")

client = MongoClient(mongodb_uri)

db = client['aniwatchScrape']
collection = db['aniwatchScrape']


def get_anime():
    try:
        anime = requests.get(api_url).json()
        collection = db['aniwatchScrape']
        collection.insert_many(anime)
    except Exception as e:
        print(e)
    finally:
        client.close()
get_anime()
