const express = require("express");
const router = express.Router();
const {
  adminLogin,
  voteTime,
  getVoteTime,
} = require("../controllers/adminController");

router.post("/login", adminLogin);
router.post("/toggle-voting", voteTime);
router.get("/get-voting-config", getVoteTime);

module.exports = router;
