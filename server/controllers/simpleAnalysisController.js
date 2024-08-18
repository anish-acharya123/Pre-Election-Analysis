const GenderPercentage = require("../models/genderPercentage");
const CandidatePercentage = require("../models/candidatePercentage");

const FetchGender = async (req, res) => {
  try {
    const Data = await GenderPercentage.find();

    if (!Data) {
      res.status(400).json({ error: "No Data Available" });
    }
    res.status(201).json({ msg: "sucess", data: Data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const FetchCandidate = async (req, res) => {
  try {
    const Data = await CandidatePercentage.find();
    if (!Data) {
      res.status(400).json({ error: "No Data Available" });
    }
    res.status(201).json({ msg: "success", data: Data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { FetchGender, FetchCandidate };
