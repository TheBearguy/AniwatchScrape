from flask import Flask, jsonify

app = Flask(__name__)

# Replace this with your actual JSON dataset
json_data = [
    {"id": 1, "name": "Item 1", "description": "Description 1"},
    {"id": 2, "name": "Item 2", "description": "Description 2"},
    # Add more data here
]

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True)
