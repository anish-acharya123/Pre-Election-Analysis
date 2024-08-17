const mongoose = require("mongoose");

const agePercentageSchema = new mongoose.Schema({
  age_group: String, // '18-25', '26-40', or '40+'
  candidate_id: String, // Candidate ID in "***-***" format
  percentage: Number, // Percentage of voters from that age group who voted for the candidate
});

const AgePercentage = mongoose.model(
  "age_group_percentage",
  agePercentageSchema
);

module.exports = AgePercentage;
