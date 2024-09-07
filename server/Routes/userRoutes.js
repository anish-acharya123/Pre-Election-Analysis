const express = require("express");
const router = express.Router();
const { loginUser, userData } = require("../controllers/userController");
const { sendOtp } = require("../controllers/sendOtp");
const verifyOtp = require("../middleware/verifyOtp");
const validateUser = require("../middleware/validateUser");

router.post("/signin", validateUser, sendOtp);
router.post("/verifyotp", verifyOtp, loginUser);

router.get("/profile", userData);

module.exports = router;
