const bcrypt = require("bcrypt");
require("dotenv").config();
// const { otpStorage } = require("../controllers/sendOtp");
const ValidateUsers = require("../models/userModel");

const verifyOtp = async (req, res, next) => {
  const { otp, voterId } = req.body;

  try {
    const user = await ValidateUsers.findOne({
      voterId,
      verifyOtpExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ error: "Otp timeout, login again" });
    }

    if (user.otp) {
      const isMatch = await bcrypt.compare(otp, user.otp);
      // console.log(isMatch);
      if (isMatch) {
        user.otp = undefined;
        user.verifyOtpExpiry = undefined;

        await user.save();
        next();
      } else {
        res.status(400).json({ error: "Invalid Otp" });
      }
    } else {
      res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP: ", error);
    res.status(500).json({ success: false, error: "Failed to verify OTP" });
  }
};

module.exports = verifyOtp;
