import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import binascii
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from datetime import datetime

# Load environment variables from .env file
load_dotenv()

# Access the environment variables
database_url = os.getenv('MONGODB_STRING_PYTHON')
secret_key = os.getenv('SECRET_KEY_HEX') 

# Connect to MongoDB
client = MongoClient(database_url)  # Adjust the connection string as needed
db = client['AEAS']  # Replace with your database name
collection = db['validvotes']  # Replace with your collection name

# Load the dataset from MongoDB
data = list(collection.find({}))  # Retrieve all documents
df = pd.DataFrame(data)

# Decryption function
def decrypt_candidate_id(encrypted_candidate_id, iv):
    key = binascii.unhexlify(secret_key)
    iv_bytes = binascii.unhexlify(iv)
    cipher = AES.new(key, AES.MODE_CBC, iv_bytes)
    decrypted = cipher.decrypt(binascii.unhexlify(encrypted_candidate_id))
    return unpad(decrypted, AES.block_size).decode('utf-8')

# Decrypt candidate_id for each row in the DataFrame
df['candidate_id'] = df.apply(lambda row: decrypt_candidate_id(row['candidate_id'], row['iv']), axis=1)

# Convert age into categorical bins for better analysis
bins = [0, 18, 25, 35, 45, 55, 65, 100]
labels = ['0-17', '18-25', '26-35', '36-45', '46-55', '56-65', '66+']
df['age_group'] = pd.cut(df['voter_age'], bins=bins, labels=labels, right=False)

# One-hot encode the categorical variables
df_encoded = pd.get_dummies(df[['age_group', 'voter_gender', 'candidate_id']], columns=['age_group', 'voter_gender', 'candidate_id'])

# Apply Apriori algorithm to find frequent itemsets
frequent_itemsets = apriori(df_encoded, min_support=0.05, use_colnames=True)

# Generate association rules
rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1)

# Format the data for insertion into MongoDB
apriori_result = {
    "frequent_itemsets": [
        {
            "itemset": list(itemset['itemsets']),
            "support": itemset['support']
        } for itemset in frequent_itemsets.to_dict('records')
    ],
    "association_rules": [
        {
            "antecedent": list(rule['antecedents']),
            "consequent": list(rule['consequents']),
            "support": rule['support'],
            "confidence": rule['confidence'],
            "lift": rule['lift'],
            "leverage": rule['leverage'],
            "conviction": rule['conviction'],
        } for rule in rules.to_dict('records')
    ],
    "created_at": datetime.now()
}

# Insert the results into the AprioriResult collection
apriori_results_collection = db['aprioriresults']  # Replace with your collection name for results
apriori_results_collection.delete_many({})
apriori_results_collection.insert_one(apriori_result)

# Close the MongoDB connection
client.close()
