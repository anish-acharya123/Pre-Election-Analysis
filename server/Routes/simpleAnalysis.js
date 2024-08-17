const express = require("express");
const router = express.Router();
const FetchGender = require("../controllers/GenderController");

router.get("/gender", FetchGender);

module.exports = router;
