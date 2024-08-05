const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admins = require("../models/adminModel");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ msg: "Please Input all the field" });
  }
  try {
    const findAdmin = await Admins.findOne({ email });
    if (!findAdmin) {
      return res.status(404).json({ msg: "Your are not registered as admin" });
    }
    const isMatch = await bcrypt.compare(password, findAdmin.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      admin: {
        email: findAdmin.email,
      },
    };

    jwt.sign(payload, "abcd", { expiresIn: "1h" }, (error, token) => {
      if (error) {
        return res.status(500).json({ msg: "Error generating token" });
      }
      res.status(200).json({ token });
    });

    // res.sjson({ token });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
};

module.exports = adminLogin;
