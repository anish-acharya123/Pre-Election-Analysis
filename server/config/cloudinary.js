const cloudinary = require("cloudinary").v2;
// require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
// require("dotenv").config({ path: "/../.env" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dpxvgxreg",
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || 952582394257768,
  // api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "vZqxiPPprqmIuZ6ObhOqsfROqFg",
  // api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
