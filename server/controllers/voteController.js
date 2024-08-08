const Validvotes = require("../models/votesModel");

const voteCount = async(req, res) => {
  const { voterId, citizenshipId } = req.body;

  if (!voterId || !citizenshipId) {
    return res
      .status(400)
      .json({ msg: "There was error while voting.Please Login again" });
  }

  try{
     const user = await Validvotes.findOne({voterId})
     if(user){
      return res.status(409).josn({msg:""})
     }

  }catch(error){
    res.status(500).json({msg:"Internal Server error"})
  }
  res.status(200).json({
    msg: "your vote is counted",
    voterId,
    citizenshipId,
  });
};

module.exports = voteCount;
