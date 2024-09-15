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

# Loading environment variables from .env file
load_dotenv()

# Accessing the environment variables
database_url = os.getenv('MONGODB_STRING_PYTHON')
    
# Connecting to MongoDB
client = MongoClient(database_url)
db = client['AEAS']  
collection = db['validvotes'] 
collection1 = db["aprioriresults"]
collection2 = db["statistics"]

# Count the total number of documents in the 'validvotes' collection
total_documents = collection.count_documents({})
# collection.delete_many({})
# collection1.delete_many({})
# collection2.delete_many({})
print(f"Total number of documents: {total_documents}")
