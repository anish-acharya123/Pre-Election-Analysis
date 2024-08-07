const { default: mongoose } = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://acharyaanish920:iamanish123@onlinevote.6fxpu.mongodb.net/AEAS"
    );
    console.log("MongoDb connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
