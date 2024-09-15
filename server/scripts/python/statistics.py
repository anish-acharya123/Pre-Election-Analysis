from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import hashlib
import binascii

# Loading environment variables from .env file
load_dotenv()

# Accessing the environment variables
database_url = os.getenv('MONGODB_STRING_PYTHON')
secret_key = os.getenv('SECRET_KEY_HEX')  # Make sure this matches your encryption key

# Connecting to MongoDB
client = MongoClient(database_url)  # Replace with your MongoDB connection string if different
db = client['AEAS']  # Replace with your database name

# Collection
votes_collection = db['validvotes']
statistics_collection = db['statistics']  # Single collection for all statistics

# Clearing existing data in the statistics collection (optional)
statistics_collection.delete_many({})

# Decryption function
def decrypt_candidate_id(encrypted_candidate_id, iv):
    # Convert secret key and iv to bytes
    key = binascii.unhexlify(secret_key)
    iv_bytes = binascii.unhexlify(iv)
    
    # Creating cipher object and decrypt
    cipher = AES.new(key, AES.MODE_CBC, iv_bytes)
    decrypted = cipher.decrypt(binascii.unhexlify(encrypted_candidate_id))
    
    # Unpadding the decrypted data
    return unpad(decrypted, AES.block_size).decode('utf-8')

# Fetch all votes
votes = list(votes_collection.find())
# print(votes)

# Total number of votes
total_votes = len(votes)

# 1. Candidate Winning Percentage
candidate_votes = {}
for vote in votes:
    encrypted_candidate_id = vote['candidate_id']
    iv = vote['iv']  # Assume IV is stored in the database with each vote
    candidate_id = decrypt_candidate_id(encrypted_candidate_id, iv)

    if candidate_id in candidate_votes:
        candidate_votes[candidate_id] += 1
    else:
        candidate_votes[candidate_id] = 1

for candidate_id, count in candidate_votes.items():
    percentage = (count / total_votes) * 100
    statistics_collection.insert_one({
        "candidate_id": candidate_id,
        "percentage": percentage,
        "ageGroup": None,
        "gender": None,
        "type": "candidate"  # Type is 'candidate'
    })

# 2. Gender Percentage
gender_votes = {}
for vote in votes:
    gender = vote['voter_gender']
    if gender in gender_votes:
        gender_votes[gender] += 1
    else:
        gender_votes[gender] = 1

for gender, count in gender_votes.items():
    percentage = (count / total_votes) * 100
    statistics_collection.insert_one({
        "candidate_id": None,
        "percentage": percentage,
        "ageGroup": None,
        "gender": gender,
        "type": "gender"  # Type is 'gender'
    })

# 3. Age Group Analysis
age_groups = {
    "18-25": 0,
    "26-40": 0,
    "41-60": 0,
    "60+":0,
}

age_group_candidate_votes = {
    "18-25": {},
    "26-40": {},
    "41-60": {},
    "60+": {},
}

for vote in votes:
    age = vote['voter_age']
    encrypted_candidate_id = vote['candidate_id']
    iv = vote['iv']  # Assume IV is stored in the database with each vote
    candidate_id = decrypt_candidate_id(encrypted_candidate_id, iv)

    if 18 <= age <= 25:
        age_group = "18-25"
    elif 26 <= age <= 40:
        age_group = "26-40"
    elif 41 <= age <= 60:
        age_group = "41-60"
    else:
        age_group = "60+"

    age_groups[age_group] += 1

    if candidate_id in age_group_candidate_votes[age_group]:
        age_group_candidate_votes[age_group][candidate_id] += 1
    else:
        age_group_candidate_votes[age_group][candidate_id] = 1

for age_group, total_in_group in age_groups.items():
    for candidate_id, count in age_group_candidate_votes[age_group].items():
        percentage = (count / total_in_group) * 100
        statistics_collection.insert_one({
            "candidate_id": candidate_id,
            "percentage": percentage,
            "ageGroup": age_group,
            "gender": None,
            "type": "age"  # Type is 'age'
        })

print("Analysis and insertion into the statistics collection complete.")