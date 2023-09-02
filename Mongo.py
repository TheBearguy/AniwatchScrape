import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import os 

load_dotenv()

api_url = os.getenv("API_URL")
mongodb_uri = os.getenv("MONGODB_URI")

client = MongoClient(mongodb_uri)

db = client['mydatabase']
collection = db['mycollection'] 

data_structure = {
    'title': str,
    'img': str,
    'type': str, 
    'time': str, 
    'quality': str, 
    'date': str, 
    'description': str,
}

def fetch_data():
    try:
        response = requests.get(api_url)
        api_data = response.json()

        collection = db['mycollection'] 
        collection.insert_many(api_data)

        print('Data added to MongoDB')
    except Exception as error:
        print('Error fetching data:', error)
    finally:
        client.close()

fetch_data()
