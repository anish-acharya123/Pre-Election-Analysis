const Validvotes = require("../models/votesModel");
const connectDb = require("../config/db");
const mongoose = require("mongoose");

const deleteValidvote = async () => {
  try {
    await connectDb();

    await Validvotes.deleteMany({});
    console.log("All documents deleted successfully.");
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

deleteValidvote();
