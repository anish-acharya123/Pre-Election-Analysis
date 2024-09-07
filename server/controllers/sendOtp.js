const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();
const ValidateUsers = require("../models/userModel");
const VotingTime = require("../models/votingTimeModel");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOtp = async (req, res) => {
  const { email, voterId, citizenshipNumber } = req.body;

  try {
    const votingConfig = await VotingTime.findOne({});
    const now = new Date();
    if (
      !votingConfig.votingEnabled ||
      now < votingConfig.votingStartTime ||
      now > votingConfig.votingEndTime
    ) {
      return res.status(403).json({
        msg: "Login is restricted as voting is not allowed at this time.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    const user = await ValidateUsers.findOneAndUpdate(
      { citizenshipNumber, voterId },
      {
        otp: hashedOtp,
        verifyOtpExpiry: Date.now() + 60 * 1000,
      },
      { new: true }
    );
    // console.log(user);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.email !== email && user.email) {
      return res.status(401).json({ msg: "Email does not match our records" });
    }

    let mailOptions = {
      from: process.env.EMAIL_NAME,
      to: email,
      subject: "Your OTP for verification",
      text: `Your OTP is ${otp}. Use this to verify your email address.`,
    };

    let info = await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ success: true, message: "OTP sent successfully", info });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
};

module.exports = { sendOtp };
