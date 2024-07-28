const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "acharyaanish920@gmail.com",
    pass: "faua fghm xtzw bhiu",
  },
});

let otpStorage = {};

const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(otp);

  const hashedOtp = await bcrypt.hash(otp.toString(), 10);
  otpStorage[email] = hashedOtp;
  // console.log(otpStorage);
  try {
    let mailOptions = {
      from: "acharyaanish920@gmail.com",
      to: email,
      subject: "Your OTP for verification",
      text: `Your OTP is ${otp}. Use this to verify your email address.`,
    };

    var Info = await transporter.sendMail(mailOptions);
    console.log(Info.response);

    res
      .status(200)
      .json({ success: true, message: "OTP sent successfully", Info });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
};
module.exports = { sendOtp, otpStorage };
