const mongoose = require("mongoose");

const statisticsSchema = new mongoose.Schema({
  candidate_id: {
    type: String,
    required: true,
  },
  ageGroup: {
    type: String, // '18-25', '26-40', or '40+'
    required: false, 
  },
  gender: {
    type: String, // 'Male', 'Female'
    required: false,
  },
  percentage: {
    type: Number, // Percentage of votes
    required: true,
  },
  type: {
    type: String, // 'age', 'gender', or 'candidate'
    required: true,
  },
});

const Statistics = mongoose.model("statistics", statisticsSchema);

module.exports = Statistics;
