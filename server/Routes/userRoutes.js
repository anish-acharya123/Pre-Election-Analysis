const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/registerController");
const { sendOtp } = require("../controllers/sendOtp");
const verifyOtp = require("../middleware/verifyOtp");
const validateUser = require("../middleware/validateUser");

router.post("/signin", validateUser, sendOtp);
router.post("/verifyotp", verifyOtp, registerUser);

router.get("/profile", (req, res) => {
  res.send("user profile");
});

module.exports = router;
