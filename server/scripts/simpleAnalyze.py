import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv
import os


# Load environment variables from .env file
load_dotenv()

# Access the environment variables
database_url = os.getenv('MONGODB_STRING_PYTHON')

# Connect to MongoDB
client = MongoClient(database_url )  # Replace with your MongoDB connection string if different
db = client['AEAS']  # Replace with your database name

# Collections
votes_collection = db['validvotes']
candidate_percentage_collection = db['candidate_percentages']
gender_percentage_collection = db['gender_percentages']
age_group_percentage_collection = db['age_group_percentages']

# Clear existing data in analysis collections (optional)
candidate_percentage_collection.delete_many({})
gender_percentage_collection.delete_many({})
age_group_percentage_collection.delete_many({})

# Fetch all votes
votes = list(votes_collection.find())

# Total number of votes
total_votes = len(votes)

# 1. Candidate Winning Percentage
candidate_votes = {}
for vote in votes:
    candidate_id = vote['candidate_id']
    if candidate_id in candidate_votes:
        candidate_votes[candidate_id] += 1
    else:
        candidate_votes[candidate_id] = 1

for candidate_id, count in candidate_votes.items():
    percentage = (count / total_votes) * 100
    candidate_percentage_collection.insert_one({
        "candidate_id": candidate_id,
        "percentage": percentage
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
    gender_percentage_collection.insert_one({
        "gender": gender,
        "percentage": percentage
    })

# 3. Age Group Analysis
age_groups = {
    "18-25": 0,
    "26-40": 0,
    "40+": 0
}

age_group_candidate_votes = {
    "18-25": {},
    "26-40": {},
    "40+": {}
}

for vote in votes:
    age = vote['voter_age']
    candidate_id = vote['candidate_id']

    if 18 <= age <= 25:
        age_group = "18-25"
    elif 26 <= age <= 40:
        age_group = "26-40"
    else:
        age_group = "40+"

    age_groups[age_group] += 1

    if candidate_id in age_group_candidate_votes[age_group]:
        age_group_candidate_votes[age_group][candidate_id] += 1
    else:
        age_group_candidate_votes[age_group][candidate_id] = 1

for age_group, total_in_group in age_groups.items():
    for candidate_id, count in age_group_candidate_votes[age_group].items():
        percentage = (count / total_in_group) * 100
        age_group_percentage_collection.insert_one({
            "age_group": age_group,
            "candidate_id": candidate_id,
            "percentage": percentage
        })

print("Analysis and insertion into collections complete.")
