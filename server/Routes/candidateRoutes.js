const express = require("express");
const router = express.Router();
const candidateList = require("../controllers/candidateController");

router.get("/list", candidateList);

module.exports = router;
