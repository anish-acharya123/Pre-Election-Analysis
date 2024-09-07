const Statistics = require("../models/statisticModel");

const AnalyzedData = async (req, res) => {
  const { type } = req.query;
  try {
    const Data = await Statistics.find({ type });

    if (!Data) {
      res.status(400).json({ error: "No Data Available" });
    }
    res.status(201).json({ msg: "success", data: Data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = AnalyzedData;
