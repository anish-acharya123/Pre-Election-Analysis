const express = require("express");
const router = express.Router();
const AnalyzedData = require("../controllers/statisticsController");
const ClusterData = require("../controllers/clusterdataController");
const AprioriData = require("../controllers/aprioriController");

router.get("/clustered-data", ClusterData);
router.get("/statistics", AnalyzedData);
router.get("/apriori", AprioriData);

module.exports = router;
