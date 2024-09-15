const { default: mongoose } = require("mongoose");
const ValidateUsers = require("../models/userModel");
const connectDb = require("../config/db");
require("dotenv").config();

const registerUser = async () => {
  await connectDb();
  try {
    const name = "Saksham Panthee";
    const voterId = "789-456-000";
    const citizenshipNumber = "123-456-111";
    const age = 22;
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
