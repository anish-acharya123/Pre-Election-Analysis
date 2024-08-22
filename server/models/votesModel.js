const mongoose = require("mongoose");

const votesSchema = new mongoose.Schema(
  {
    candidate_id: {
      type: String,
      require: true,
      trim: true,
    },
    voter_id: {
      type: String,
      unique: true,
      require: true,
    },
    voter_age: {
      type: Number,

      require: true,
    },
    voter_gender: {
      type: String,

      require: true,
    },
    iv: {
      type: String, // Store the IV as a hexadecimal string
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// to ensure that only one user can vote to one candidate
// votesSchema.index({ candidateId: 1, userId: 1 }, { unique: true });

const Validvotes = mongoose.model("validvote", votesSchema);

module.exports = Validvotes;
