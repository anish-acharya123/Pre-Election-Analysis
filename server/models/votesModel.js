const mongoose = require("mongoose");

const votesSchema = new mongoose.Schema(
  {
    candidateId: {
      type: String,
      require: true,
      trim: true,
    },
    voteId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      unique: true,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// to ensure that only one user can vote to one candidate
votesSchema.index({ candidateId: 1, userId: 1 }, { unique: true });

const Validvotes = mongoose.model("validvote", votesSchema);

module.exports = Validvotes;
