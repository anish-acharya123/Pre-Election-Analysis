const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();
const ValidateUsers = require("../models/userModel");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

let otpStorage = {};

const sendOtp = async (req, res) => {
  const { email, voterId, citizenshipNumber } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    const user = await ValidateUsers.findOne({ citizenshipNumber, voterId });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.email !== email && user.email) {
      return res.status(401).json({ msg: "Email does not match our records" });
    }

    otpStorage[email] = hashedOtp;

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

module.exports = { sendOtp, otpStorage };
