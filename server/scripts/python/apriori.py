import binascii
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from pymongo import MongoClient
from dotenv import load_dotenv
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
import os
import datetime

# Load environment variables from .env file
load_dotenv()

# MongoDB connection
database_url = os.getenv('MONGODB_STRING_PYTHON')
secret_key = os.getenv('SECRET_KEY_HEX')

# Function to decrypt candidate_id
def decrypt_candidate_id(encrypted_candidate_id, iv):
    key = binascii.unhexlify(secret_key)
    iv_bytes = binascii.unhexlify(iv)
    cipher = AES.new(key, AES.MODE_CBC, iv_bytes)
    decrypted = cipher.decrypt(binascii.unhexlify(encrypted_candidate_id))
    return unpad(decrypted, AES.block_size).decode('utf-8')

# Connect to MongoDB
client = MongoClient(database_url)
db = client['AEAS']
voter_collection = db['validvotes']
apriori_collection = db['aprioriresults']

apriori_collection.delete_many({})

# Fetch data from MongoDB
voter_data = list(voter_collection.find())

# Decrypt candidate IDs in the dataset
for voter in voter_data:
    encrypted_candidate_id = voter.get('encrypted_candidate_id')
    iv = voter.get('iv')  # Assuming IV is also stored in the database
    if encrypted_candidate_id and iv:
        voter['candidate_id'] = decrypt_candidate_id(encrypted_candidate_id, iv)

# Convert MongoDB data to pandas DataFrame
df = pd.DataFrame(voter_data)

# Preprocess data: binning voter age into age groups
bins = [0, 18, 25, 35, 45, 55, 65, 100]
labels = ['0-17', '18-25', '26-35', '36-45', '46-55', '56-65', '66+']
df['age_group'] = pd.cut(df['voter_age'], bins=bins, labels=labels, right=False)

# One-hot encode the categorical variables
df_encoded = pd.get_dummies(df[['age_group', 'voter_gender', 'candidate_id']], columns=['age_group', 'voter_gender', 'candidate_id'])

# Apply Apriori algorithm to find frequent itemsets
frequent_itemsets = apriori(df_encoded, min_support=0.05, use_colnames=True)

# Generate association rules using the lift metric
rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1)

# Prepare Apriori data for MongoDB insertion based on the schema
frequent_itemsets_to_insert = []
for _, itemset in frequent_itemsets.iterrows():
    frequent_itemsets_to_insert.append({
        'itemset': list(itemset['itemsets']),  # Convert itemset to list
        'support': itemset['support']
    })

association_rules_to_insert = []
for _, rule in rules.iterrows():
    association_rules_to_insert.append({
        'antecedent': list(rule['antecedents']),  # Convert antecedents to list
        'consequent': list(rule['consequents']),  # Convert consequents to list
        'support': rule['support'],
        'confidence': rule['confidence'],
        'lift': rule['lift'],
        'leverage': rule['leverage'],
        'conviction': rule['conviction']
    })

# Insert the Apriori result in the format defined by your schema
apriori_collection.insert_one({
    'frequent_itemsets': frequent_itemsets_to_insert,
    'association_rules': association_rules_to_insert,
    'created_at': datetime.datetime.now()
})

print("Apriori results inserted into MongoDB as per your schema.")
