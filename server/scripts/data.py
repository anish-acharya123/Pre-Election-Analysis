import random
import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv
import os


# Load environment variables from .env file
load_dotenv()

# Access the environment variables
database_url = os.getenv('MONGODB_STRING_PYTHON')

# Connect to MongoDB
client = MongoClient(database_url ) 
db = client['AEAS']  # Replace with your database name
collection = db['validvotes']  # Replace with your collection name

# Clear existing data (optional)
collection.delete_many({})

# Function to generate random voter ID in "***-***-***" format
def generate_voter_id():
    return f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(100, 999)}"

# Function to generate a list of 5 distinct candidate IDs in "***-***" format
def generate_candidate_ids():
    return [f"{random.randint(100, 999)}-{random.randint(100, 999)}" for _ in range(5)]

# Generate 5 candidate IDs
candidate_ids = generate_candidate_ids()

# Function to generate random voter data
def generate_voter_data(candidate_ids):
    voter_id = generate_voter_id()
    voter_age = random.randint(18, 90)
    voter_gender = random.choice(['Male', 'Female', 'Other'])
    candidate_id = random.choice(candidate_ids)  # Choose a candidate from the list of 5 candidates
    return {
        'voter_id': voter_id,
        'voter_age': voter_age,
        'voter_gender': voter_gender,
        'candidate_id': candidate_id
    }

# Generate and insert 1000 mock voting data entries
data = [generate_voter_data(candidate_ids) for _ in range(1000)]
collection.insert_many(data)

print("Data generation and insertion complete.")
