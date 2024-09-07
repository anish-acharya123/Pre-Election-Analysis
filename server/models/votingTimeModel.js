const mongoose = require("mongoose");

const VotingTimeSchema = new mongoose.Schema({
  votingEnabled: { type: Boolean, default: false },
  votingStartTime: { type: Date, required: false },
  votingEndTime: { type: Date, required: false },
});

const VotingTime = mongoose.model("VotingTime", VotingTimeSchema);
module.exports = VotingTime;
