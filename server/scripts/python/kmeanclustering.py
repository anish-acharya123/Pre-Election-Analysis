from pymongo import MongoClient
import numpy as np
from sklearn.preprocessing import LabelEncoder
from dotenv import load_dotenv
import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import binascii

# Loading environment variables from .env file
load_dotenv()

# Accessing the environment variables
database_url = os.getenv('MONGODB_STRING_PYTHON')

# Secret key for AES decryption
secret_key = binascii.unhexlify(os.getenv('SECRET_KEY_HEX'))

# Connecting to MongoDB
client = MongoClient(database_url)
db = client['AEAS']
collection = db['validvotes']

# Retrieving voting data (encrypted candidate_id and iv)
voting_data = list(collection.find({}, {'_id': 0, 'candidate_id': 1, 'iv': 1, 'voter_id': 1, 'voter_age': 1, 'voter_gender': 1}))

# Function to decrypt candidate_id
def decrypt_candidate_id(encrypted_candidate_id, iv, secret_key):
    cipher = AES.new(secret_key, AES.MODE_CBC, binascii.unhexlify(iv))
    decrypted = unpad(cipher.decrypt(binascii.unhexlify(encrypted_candidate_id)), AES.block_size)
    return decrypted.decode('utf-8')

# Decrypt candidate IDs
decrypted_candidate_ids = [decrypt_candidate_id(voter['candidate_id'], voter['iv'], secret_key) for voter in voting_data]

# Encoding candidate_id (categorical data to numerical)
label_encoder = LabelEncoder()
encoded_candidate_ids = label_encoder.fit_transform(decrypted_candidate_ids)

# Preparing data for clustering (using age and encoded candidate_id)
voter_ages = np.array([float(voter['voter_age']) for voter in voting_data])
X = np.column_stack((voter_ages, encoded_candidate_ids))

# K-means clustering
def kmeans(X, n_clusters, max_iter=300):
    np.random.seed(42)  # For reproducibility
    initial_centroids_idx = np.random.choice(len(X), n_clusters, replace=False)
    centroids = X[initial_centroids_idx]

    for _ in range(max_iter):
        clusters = np.array([np.argmin(np.linalg.norm(x - centroids, axis=1)) for x in X])
        new_centroids = np.array([X[clusters == k].mean(axis=0) for k in range(n_clusters)])
        if np.all(centroids == new_centroids):
            break
        centroids = new_centroids

    return clusters, centroids

# Performing K-means clustering
n_clusters = 3
clusters, centroids = kmeans(X, n_clusters)

# Preparing data according to the new schema
clustered_data = []
for idx, voter in enumerate(voting_data):
    clustered_data.append({
        'candidate_id': decrypted_candidate_ids[idx],
        'age': voter['voter_age'],
        'gender': voter['voter_gender'],
        'cluster': int(clusters[idx])
    })

# Clearing existing data in the new collection before inserting new data
cluster_collection = db['clustered_voting_datas']
cluster_collection.delete_many({})  # Delete all documents in the collection

# Inserting clustered data back into MongoDB (in the new collection)
cluster_collection.insert_many(clustered_data)

print("Clustering and data insertion complete.")
