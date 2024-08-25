const jwt = require("jsonwebtoken");

const adminTokenvalidation = async (req, res) => {
  const token = req.cookies.token;
  //   console.log(token);

  if (!token) {
    // console.log("anish");
    return res
      .status(400)
      .json({ isValid: false, message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    res.status(200).json({ isValid: true, decoded });
  } catch (error) {
    res.status(401).json({ isValid: false, message: "Invalid token" });
  }
};

module.exports = adminTokenvalidation;
