const { default: mongoose } = require("mongoose");
const ValidateUsers = require("../models/userModel");
const connectDb = require("../config/db");
require("dotenv").config();

 connectDb();
const registerUser = async () => {
  try {
    const name = "Anish Acharya";
    const voterId = "789-456-333";
    const citizenshipNumber = "123-456-777";
    const age = 32;
    const gender = "male";
    const newUser = new ValidateUsers({
      name,
      voterId,
      citizenshipNumber,
      age,
      gender,
      email: undefined,
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
