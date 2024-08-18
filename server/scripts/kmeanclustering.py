from pymongo import MongoClient
from sklearn.cluster import KMeans
import numpy as np
from sklearn.preprocessing import LabelEncoder
from dotenv import load_dotenv
import os


# Load environment variables from .env file
load_dotenv()

# Access the environment variables
database_url = os.getenv('MONGODB_STRING_PYTHON')


# Connect to MongoDB
client = MongoClient(database_url) 
db = client['AEAS'] 
collection = db['validvotes']

# Retrieve voting data
voting_data = list(collection.find({}, {'_id': 0, 'candidate_id': 1, 'voter_id': 1, 'voter_age': 1, 'voter_gender': 1}))

# Prepare data for clustering (using age and candidate_id)
voter_ages = np.array([voter['voter_age'] for voter in voting_data])
candidate_ids = np.array([voter['candidate_id'] for voter in voting_data])

# Encode candidate_id (categorical data to numerical)
label_encoder = LabelEncoder()
encoded_candidate_ids = label_encoder.fit_transform(candidate_ids)

# Combine these features into a single data matrix
X = np.column_stack((voter_ages, encoded_candidate_ids))

# Perform K-means clustering
kmeans = KMeans(n_clusters=3)
clusters = kmeans.fit_predict(X)

# Prepare clustered data
clustered_data = []
for idx, voter in enumerate(voting_data):
    voter['cluster'] = int(clusters[idx])
    clustered_data.append(voter)

# Insert clustered data back into MongoDB (in a new collection)
cluster_collection = db['clustered_voting_datas']
cluster_collection.insert_many(clustered_data)

print("Clustering and data insertion complete.")
