const GenderPercentage = require("../models/genderPercentage");

const FetchGender = async (req, res) => {
  const Data = await GenderPercentage.find();
  res.status(201).json({ msg: "sucess", data: Data });
};

module.exports = FetchGender;
