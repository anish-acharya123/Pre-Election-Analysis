const { default: mongoose } = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_STRING ||
        "mongodb+srv://acharyaanish920:iamanish123@onlinevote.6fxpu.mongodb.net/AEAS"
    );
    console.log("MongoDb connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
