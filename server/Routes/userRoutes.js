const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/registerController");
const { sendOtp } = require("../controllers/sendOtp");
const verifyOtp = require("../middleware/verifyOtp");

router.post("/signup", sendOtp);
router.post("/verify-otp", verifyOtp, registerUser);

router.post("/signin", (req, res) => {
  res.send("signin");
});

router.get("/profile", (req, res) => {
  res.send("user profile");
});

module.exports = router;
