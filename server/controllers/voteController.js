const Validvotes = require("../models/votesModel");
const crypto = require("crypto");

// Hash function
const hashData = (data) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

const voteCount = async (req, res) => {
  const { voterId, candidateId, voterAge, iv, voterGender } = req.body;
  console.log(candidateId, voterId, iv);
  // console.log(req.body);

  // Hash the encrypted voterId
  const hashedVoterId = hashData(voterId);
  // console.log(hashedVoterId);

  if (!voterId || !candidateId) {
    return res
      .status(400)
      .json({ msg: "There was an error while voting. Please log in again." });
  }

  try {
    // Check if the user has already voted
    const user = await Validvotes.findOne({ voter_id: hashedVoterId });
    // console.log(user);
    if (user) {
      return res
        .status(409)
        .json({ error: "You have already voted for your candidate." });
    }

    const voteSubmit = new Validvotes({
      candidate_id: candidateId,
      voter_id: hashedVoterId,
      iv,
      voter_age: voterAge,
      voter_gender: voterGender,
    });

    await voteSubmit.save();

    res.status(200).json({
      msg: "Your vote has been counted.",
    });
  } catch (error) {
    console.error("Error:", error.message); // Log the actual error message for debugging
    res.status(500).json({ msg: "Internal Server " });
  }
};

module.exports = voteCount;
