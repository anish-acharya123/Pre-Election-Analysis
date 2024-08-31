const { default: mongoose } = require("mongoose");
const ValidateUsers = require("../models/userModel");
const connectDb = require("../config/db");
const validateUser = require("../middleware/validateUser");

const registerUser = async () => {
  try {
    await connectDb();
    const name = "Nirmal Thapa";
    const voterId = "789-456-111";
    const citizenshipNumber = "123-456-999";
    const age = 32;
    const gender = "male";
    const newUser = new ValidateUsers({
      name,
      voterId,
      citizenshipNumber,
      age,
      gender,
    });
    await newUser.save();

    // await ValidateUsers.deleteMany({});
    // validateUser.getIndexes();
  } catch (error) {
    console.error("Error", error);
  } finally {
    mongoose.disconnect();
  }
};

registerUser();
