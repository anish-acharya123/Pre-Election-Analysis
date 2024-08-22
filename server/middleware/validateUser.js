const z = require("zod");
const ValidateUsers = require("../models/userModel");

const User = z.object({
  Email: z.string().email(),
  voterId: z.string(),
  citizenshipNumber: z.string(),
});

const validateUser = async (req, res, next) => {
  const { email, voterId, citizenshipNumber } = req.body;

  try {
    const checkUser = await ValidateUsers.find({ voterId, citizenshipNumber });
    // console.log(checkUser);

    if (checkUser.length === 0) {
      return res.status(401).json({ msg: "Your credientials are wrong" });
    }
    const result = User.safeParse({
      Email: email,
      voterId: voterId,
      citizenshipNumber: citizenshipNumber,
    });
    if (result.success) {
      next();
    } else {
      res
        .status(403)
        .json({ msg: "Your input data should be in proper format" });
    }
  } catch (e) {
    res.status(500).json({ msg: "internal server Error" });
  }
};

module.exports = validateUser;
