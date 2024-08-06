const { default: mongoose } = require("mongoose");
const ValidateUsers = require("../models/userModel");
const connectDb = require("../config/db");
const validateUser = require("../middleware/validateUser");

const registerUser = async () => {
  try {
    await connectDb();
    const name = "Bhuwan Pandey";
    const voterId = "457-621-123";
    const citizenshipNumber = "145-365-789";
    const newUser = new ValidateUsers({
      name,
      voterId,
      citizenshipNumber,
    });
    await newUser.save();
    // validateUser.getIndexes();
  } catch (error) {
    console.error("Error", error);
  } finally {
    mongoose.disconnect();
  }
};

registerUser();
