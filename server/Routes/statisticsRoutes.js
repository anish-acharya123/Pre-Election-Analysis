const express = require("express");
const router = express.Router();
const AnalyzedData = require("../controllers/statisticsController");
const ClusterData = require("../controllers/clusterdataController");

router.get("/clustered-data", ClusterData);
router.get("/statistics", AnalyzedData);

module.exports = router;
