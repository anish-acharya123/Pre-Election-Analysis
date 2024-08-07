const bcrypt = require("bcrypt");
require("dotenv").config();
const { otpStorage } = require("../controllers/sendOtp");

const verifyOtp = async (req, res, next) => {
  const { email, otp, voterId } = req.body;
  const hashedOtp = otpStorage[email];
  console.log(hashedOtp);

  try {
    if (hashedOtp) {
      const isMatch = await bcrypt.compare(otp, hashedOtp);
      console.log(isMatch);
      if (isMatch) {
        delete otpStorage[email];
        next();
      } else {
        res.status(400).json({ msg: "Invalid Otp" });
      }
    } else {
      res.status(400).json({ success: false, msg: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP: ", error);
    res.status(500).json({ success: false, error: "Failed to verify OTP" });
  }
};

module.exports = verifyOtp;
