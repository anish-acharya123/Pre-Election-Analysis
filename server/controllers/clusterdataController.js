const ClusteredData = require("../models/clusteringModel");

const ClusterData = async (req, res) => {
  try {
    const data = await ClusteredData.find({});
    // console.log(data);
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = ClusterData;
