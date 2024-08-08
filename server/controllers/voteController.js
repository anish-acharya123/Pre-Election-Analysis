const voteCount = (req, res) => {
  const { encryptedVoterId, encryptedCandidateId } = req.body;

  res.status(200).json({
    msg: "your vote is counted",
    encryptedCandidateId,
  });
};

module.exports = voteCount;
