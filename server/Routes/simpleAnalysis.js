const express = require("express");
const router = express.Router();
const {
  FetchGender,
  FetchCandidate,
} = require("../controllers/simpleAnalysisController");
const ClusterData = require("../controllers/clusterdataController");

router.get("/gender", FetchGender);
router.get("/candidate", FetchCandidate);
router.get("/clustered-data", ClusterData);

module.exports = router;
