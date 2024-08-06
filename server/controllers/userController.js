// const bcrypt = require("bcrypt");
const ValidateUsers = require("../models/userModel");

///sign up
const registerUser = async (req, res) => {
  const { email, voterId, citizenshipNumber } = req.body;

  if (!email || !voterId || !citizenshipNumber) {
    return res.status(401).json({ msg: "Input format is wrong" });
  }

  try {
    const findUser = await ValidateUsers.findOne({
      citizenshipNumber,
      voterId,
    });
    findUser.email = email;
    await findUser.save();
    res.status(200).json({ msg: " user login success" });
  } catch (err) {
    res.status(500).json({ msg: " Internal server error" });
  }
};

//get user data
const userData = async (req, res) => {
  const { voterId, email } = req.query;
  try {
    const user = await ValidateUsers.findOne({ voterId, email });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { registerUser, userData };
