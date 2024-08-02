const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    description: {
      type: String,
      trim: true,
    },
    photo: {
      type: String, // URL or path to the photo
      trim: true,
    },
    party: {
      type: String,
      required: true,
      trim: true,
    },
    candidateId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
