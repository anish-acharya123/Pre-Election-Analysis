import random
import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from hashlib import sha256
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Random import get_random_bytes
import binascii
import csv

# Load environment variables from .env file
load_dotenv()

# Access the environment variables
database_url = os.getenv('MONGODB_STRING_PYTHON')
    
# Connect to MongoDB
client = MongoClient(database_url)
db = client['AEAS']  
collection = db['validvotes'] 

# Clear existing data (optional)
collection.delete_many({})

# Function to generate random voter ID in "***-***-***" format
def generate_voter_id():
    return f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(100, 999)}"

# Function to generate a list of 5 distinct candidate IDs in "***-***" format
def generate_candidate_ids():
    return {
        "213-846": 0,
        "855-525": 1,
        "521-757": 2,
        "875-393": 3,
        "151-426": 4
    }

# Generate candidate IDs
candidate_ids = generate_candidate_ids()

# Function to hash voter ID
def hash_voter_id(voter_id):
    return sha256(voter_id.encode('utf-8')).hexdigest()

# Function to encrypt candidate ID
def encrypt_candidate_id(candidate_id, secret_key):
    iv = get_random_bytes(16)
    cipher = AES.new(secret_key, AES.MODE_CBC, iv)
    encrypted = cipher.encrypt(pad(candidate_id.encode('utf-8'), AES.block_size))
    return binascii.hexlify(encrypted).decode('utf-8'), binascii.hexlify(iv).decode('utf-8')

# Secret key for AES encryption
secret_key = binascii.unhexlify(os.getenv('SECRET_KEY_HEX'))

# Seed the random number generator for consistent results
random.seed(42)

# Function to generate random voter data
def generate_voter_data(voter_id=None):
    if not voter_id:
        voter_id = generate_voter_id()
    voter_age = random.randint(18, 90)
    voter_gender = random.choice(['Male', 'Female'])
    candidate_id = random.choice(list(candidate_ids.keys()))  # Choose a candidate from the list
    return {
        'voter_id': voter_id,
        'voter_age': voter_age,
        'voter_gender': voter_gender,
        'candidate_id': candidate_id
    }

# Add specific voter IDs
specific_voter_ids = ["789-456-333", "789-456-444"]

# Generate data
data = []
for _ in range(998):
    data.append(generate_voter_data())

# Adding specific voter IDs
for voter_id in specific_voter_ids:
    data.append(generate_voter_data(voter_id))

# Save data to CSV
csv_file = 'voter_data.csv'
with open(csv_file, mode='w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=['voter_id', 'voter_age', 'voter_gender', 'candidate_id'])
    writer.writeheader()
    writer.writerows(data)

print(f"CSV file '{csv_file}' created successfully.")

# Encrypt the data before inserting into MongoDB
encrypted_data = []
for item in data:
    encrypted_candidate_id, iv = encrypt_candidate_id(item['candidate_id'], secret_key)
    encrypted_data.append({
        'voter_id': hash_voter_id(item['voter_id']),
        'voter_age': item['voter_age'],
        'voter_gender': item['voter_gender'],
        'candidate_id': encrypted_candidate_id,
        'iv': iv
    })

# Insert encrypted data into MongoDB
collection.insert_many(encrypted_data)

print("Data encryption and insertion into MongoDB complete.")