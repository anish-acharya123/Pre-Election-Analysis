const { default: mongoose } = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/demo_project");
    console.log("MongoDb connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
