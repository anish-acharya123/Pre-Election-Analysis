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
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(otp);

  const hashedOtp = await bcrypt.hash(otp.toString(), 10);
  const emailCheck = await ValidateUsers.find({ email, voterId });

  /// noting change
  if (emailCheck.length == 0) {
    const findUser = await ValidateUsers.findOne({
      citizenshipNumber,
      voterId,
    });
    findUser.email = email;
    await findUser.save();
    otpStorage[email] = hashedOtp;
  } else {
    otpStorage[emailCheck[0].email] = hashedOtp;
  }

  try {
    let mailOptions = {
      from: process.env.EMAIL_NAME,
      to: emailCheck.length > 0 ? emailCheck[0].email : email,
      subject: "Your OTP for verification",
      text: `Your OTP is ${otp}. Use this to verify your email address.`,
    };

    var Info = await transporter.sendMail(mailOptions);
    // console.log(Info.response);

    res
      .status(201)
      .json({ success: true, message: "OTP sent successfully", Info });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
};
module.exports = { sendOtp, otpStorage };
