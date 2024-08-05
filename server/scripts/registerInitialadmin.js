const { default: mongoose } = require("mongoose");
const connectDb = require("../config/db");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");

const registerInitialAdmin = async () => {
  try {
    await connectDb();
    const email = "acharyaanish920@gmail.com";
    const password = "anish@123";

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      email,
      password: hashPassword,
    });
    await newAdmin.save();
    console.log("inital admin registered");
  } catch (error) {
    console.error("Error registering admin", error);
  } finally {
    mongoose.disconnect();
  }
};

registerInitialAdmin();
