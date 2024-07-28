const bcrypt = require("bcrypt");

const registerUser = (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(401).json({ msg: "Input format is wrong" });
  }

  
};

module.exports = registerUser;
