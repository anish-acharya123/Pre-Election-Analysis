import pandas as pd
import matplotlib.pyplot as plt
from pymongo import MongoClient

# Example data with equal lengths
csv_file_path = 'C:/Users/ASUS/Desktop/Pre - Elect Analysis/server/StudentsPerformance.csv'

data = pd.read_csv(csv_file_path)

# Creating DataFrame with equal length arrays
sp = pd.DataFrame(data)

# MongoDB connection setup
client = MongoClient('mongodb://localhost:27017/')
db = client['election_analysis']
collection = db['piechartdatas']

# Function to insert pie chart data
def insert_pie_chart_data(category, data):
    total_count = len(data)
    pie_data = (data.value_counts() / total_count * 100).round(2).to_dict()
    pie_doc = {
        'category': category,
        'data': [{'label': k, 'value': v} for k, v in pie_data.items()]
    }
    collection.insert_one(pie_doc)

# Inserting data into MongoDB
insert_pie_chart_data('Gender', sp['gender'])
insert_pie_chart_data('Race/Ethnicity', sp['race/ethnicity'])
insert_pie_chart_data('Lunch', sp['lunch'])
insert_pie_chart_data('Test Preparation Course', sp['test preparation course'])
insert_pie_chart_data('Parental Level of Education', sp['parental level of education'])

print("Data inserted successfully")