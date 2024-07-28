const z = require("zod");
// const AuthorizedUser = require("../model/authorizedUser");

const User = z.object({
  Email: z.string().email(),
  IdentityNumber: z.string().min(6),
});

const validateUser = async (req, res, next) => {
  const {  email, password,  } = req.body;
  // console.log(identity_number);

  //   const checkUser = await AuthorizedUser.find({ identity_number, email });
  //   console.log(checkUser);

  if (checkUser.length == 0) {
    return res.status(404).json({ msg: "You are not registered to vote" });
  }

  const result = User.safeParse({
    Email: email,
    IdentityNumber: identity_number,
  });

  if (result.success) {
    next();
  } else {
    res.status(403).json({ msg: "Your input data should be in proper format" });
  }
};

module.exports = validateUser;
