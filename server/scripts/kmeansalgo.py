from pymongo import MongoClient
import numpy as np
from sklearn.preprocessing import LabelEncoder
from dotenv import load_dotenv
import os

# Loading environment variables from .env file
load_dotenv()

# Accessing the environment variables
database_url = os.getenv('MONGODB_STRING_PYTHON')

# Connecting to MongoDB
client = MongoClient(database_url) 
db = client['AEAS'] 
collection = db['validvotes']

# Retrieving voting data
voting_data = list(collection.find({}, {'_id': 0, 'candidate_id': 1, 'voter_id': 1, 'voter_age': 1, 'voter_gender': 1}))

# Preparing data for clustering (using age and candidate_id)
voter_ages = np.array([voter['voter_age'] for voter in voting_data])
candidate_ids = np.array([voter['candidate_id'] for voter in voting_data])

# Encoding candidate_id (categorical data to numerical)
label_encoder = LabelEncoder()
encoded_candidate_ids = label_encoder.fit_transform(candidate_ids)

# Combining these features into a single data matrix
X = np.column_stack((voter_ages, encoded_candidate_ids))

# K-means clustering 
def kmeans(X, n_clusters, max_iter=300):
    # Initialize centroids randomly from the data points
    np.random.seed(42)  # For reproducibility
    initial_centroids_idx = np.random.choice(len(X), n_clusters, replace=False)
    centroids = X[initial_centroids_idx]

    for _ in range(max_iter):
        # Assigning clusters based on the closest centroid
        clusters = np.array([np.argmin(np.linalg.norm(x - centroids, axis=1)) for x in X])

        # Calculating new centroids by taking the mean of all points in each cluster
        new_centroids = np.array([X[clusters == k].mean(axis=0) for k in range(n_clusters)])

        # Checking for convergence (if centroids do not change)
        if np.all(centroids == new_centroids):
            break

        centroids = new_centroids

    return clusters, centroids

# Performing K-means clustering
n_clusters = 3
clusters, centroids = kmeans(X, n_clusters)

# Preparing clustered data
clustered_data = []
for idx, voter in enumerate(voting_data):
    voter['cluster'] = int(clusters[idx])
    clustered_data.append(voter)

# Inserting clustered data back into MongoDB (in a new collection)
cluster_collection = db['clustered_voting_datas']
cluster_collection.insert_many(clustered_data)

print("Clustering and data insertion complete.")
