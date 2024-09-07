const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admins = require("../models/adminModel");
const VotingTime = require("../models/votingTimeModel");

const adminLogin = async (req, res) => {
  // console.log(process.env.JWT_TOKEN_SECRET);
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

    const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
      path: "/",
    });
    // console.log(token);
    return res.status(200).json({ msg: "Login successful", success: true });

    // res.sjson({ token });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
};

const voteTime = async (req, res) => {
  const { votingEnabled, votingStartTime, votingEndTime } = req.body;
  console.log(req.body);

  await VotingTime.updateOne(
    {},
    { votingEnabled, votingStartTime, votingEndTime },
    { upsert: true }
  );

  res.status(200).json({ message: "Voting status updated" });
};

const getVoteTime = async (req, res) => {
  try {
    const votingConfig = await VotingTime.findOne({});
    res.status(200).json(votingConfig);
  } catch (error) {
    res.status(500).json({ message: "Error fetching voting config" });
  }
};

module.exports = { adminLogin, voteTime, getVoteTime };
