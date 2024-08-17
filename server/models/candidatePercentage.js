const mongoose = require("mongoose");

const candidatePercentageSchema = new mongoose.Schema({
  candidate_id: String, // Candidate ID in "***-***" format
  percentage: Number, // Winning percentage of votes
});

const CandidatePercentage = mongoose.model(
  "candidate_percentage",
  candidatePercentageSchema
);

module.exports = CandidatePercentage;
