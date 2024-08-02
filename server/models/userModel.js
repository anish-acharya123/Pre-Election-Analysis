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
    required: "Email address is required",
  },
});

const ValidateUsers = new mongoose.model("validUser", validUserSchema);

module.exports = ValidateUsers;
