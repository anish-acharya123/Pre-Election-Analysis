import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import binascii
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from datetime import datetime
from itertools import combinations

# Load environment variables from .env file
load_dotenv()

# Access the environment variables
database_url = os.getenv('MONGODB_STRING_PYTHON')
secret_key = os.getenv('SECRET_KEY_HEX')

# Connect to MongoDB
client = MongoClient(database_url)  
db = client['AEAS']  
collection = db['validvotes']  
# Load the dataset from MongoDB
data = list(collection.find({}))  
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

#function implementing apriori
def apriori(df, minsupport):
    def get_frequent_itemsets(df, itemset_size, minsupport):
        itemsets = {}
        for idx, row in df.iterrows():
            items = row[row == 1].index
            for combination in combinations(items, itemset_size):
                combination = frozenset(combination)
                if combination in itemsets:
                    itemsets[combination] += 1
                else:
                    itemsets[combination] = 1
        total_rows = len(df)
        return {itemset: support / total_rows for itemset, support in itemsets.items() if support / total_rows >= min_support}

    itemset_size = 1
    frequent_itemsets = []
    current_frequent_itemsets = get_frequent_itemsets(df, itemset_size, min_support)

    while current_frequent_itemsets:
        frequent_itemsets.extend([(itemset, support) for itemset, support in current_frequent_itemsets.items()])
        itemset_size += 1
        current_frequent_itemsets = get_frequent_itemsets(df, itemset_size, min_support)

    frequent_itemsets_df = pd.DataFrame(frequent_itemsets, columns=['itemsets', 'support'])
    return frequent_itemsets_df

# function call for Apriori algorithm
minsupport = 0.05
frequent_itemsets = apriori(df_encoded, minsupport)

# Generate association rules including leverage and conviction
def association_rules(frequent_itemsets, min_confidence=0.1, min_lift=1.0):
    total_transactions = len(df_encoded)
    rules = []
    for i, (itemset, support) in frequent_itemsets.iterrows():
        for consequent_size in range(1, len(itemset)):
            for consequent in combinations(itemset, consequent_size):
                antecedent = itemset.difference(consequent)
                if len(antecedent) == 0:
                    continue
                antecedent_support = frequent_itemsets[frequent_itemsets['itemsets'] == antecedent]['support'].values[0]
                consequent_support = frequent_itemsets[frequent_itemsets['itemsets'] == frozenset(consequent)]['support'].values[0]
                confidence = support / antecedent_support
                if confidence >= min_confidence:
                    lift = confidence / consequent_support
                    if lift >= min_lift:  # Apply lift threshold
                        leverage = support - (antecedent_support * consequent_support)
                        conviction = (1 - consequent_support) / (1 - confidence) if confidence != 1 else float('inf')
                        rules.append({
                            'antecedents': antecedent,
                            'consequents': consequent,
                            'support': support,
                            'confidence': confidence,
                            'lift': lift,
                            'leverage': leverage,
                            'conviction': conviction,
                        })
    return pd.DataFrame(rules)

# lift threshold
min_lift = 1.0
#functionc all to generate association rules
rules = association_rules(frequent_itemsets, min_confidence=0.1, min_lift=min_lift)

# Formatting the data for insertion into db
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

# Inserting the rules into the db
apriori_results_collection = db['aprioriresults'] 
apriori_results_collection.delete_many({})
apriori_results_collection.insert_one(apriori_result)
client.close()
