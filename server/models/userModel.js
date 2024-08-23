const mongoose = require("mongoose");

const validUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  voterId: {
    type: String,
    required: true,
    unique: true,
  },
  citizenshipNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    default: 22,
  },
  gender: {
    type: String,
    required: true,
  },
  otp: String,
  verifyOtpExpiry: Date,
});

const ValidateUsers = mongoose.model("validUser", validUserSchema);

module.exports = ValidateUsers;
