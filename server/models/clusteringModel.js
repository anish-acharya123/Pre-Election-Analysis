const mongoose = require("mongoose");

// Define a Mongoose schema for the clustered data
const ClusteredDataSchema = new mongoose.Schema({
  candidate_id: String,
  voter_id: String,
  age: Number,
  gender: String,
  cluster: Number,
});

const ClusteredData = mongoose.model(
  "clustered_voting_data",
  ClusteredDataSchema
);

module.exports = ClusteredData;
