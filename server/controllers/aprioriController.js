const AprioriResult = require("../models/aprioriModel");

const AprioriData = async (req, res) => {
  try {
    const results = await AprioriResult.find()
      .sort({ created_at: -1 })
      .limit(1); // Fetch the most recent results
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Apriori results" });
  }
};

module.exports = AprioriData;
