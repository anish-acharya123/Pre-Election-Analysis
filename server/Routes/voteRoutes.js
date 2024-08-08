const express = require("express");
const router = express.Router();
const voteCount = require("../controllers/voteController");

router.post("/", voteCount);

module.exports = router;
