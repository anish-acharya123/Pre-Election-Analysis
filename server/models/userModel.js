const mongoose = require("mongoose");

const validUserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  voterId: {
    type: String,
    require: true,
    unique: true,
  },
  citizenshipNumber: {
    type: String,
    require: true,
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
    require: true,
    default: 22,
  },
  gender: {
    type: String,
    require: true,
    default: "male",
  },
});

const ValidateUsers = mongoose.model("validUser", validUserSchema);

module.exports = ValidateUsers;
