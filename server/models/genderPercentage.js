const mongoose = require("mongoose");

const genderPercentageSchema = new mongoose.Schema({
  gender: String, // 'Male' or 'Female' or 'Other'
  percentage: Number, // Percentage of voters of that gender
});

const GenderPercentage = mongoose.model(
  "gender_percentage",
  genderPercentageSchema
);

module.exports = GenderPercentage;
