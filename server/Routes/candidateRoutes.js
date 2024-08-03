const express = require("express");
const router = express.Router();
const multer = require("multer");
// const cloudinary = require("../config/cloudinary");

const {
  candidateList,
  uploadCandidate,
} = require("../controllers/candidateController");

const upload = multer({ dest: "uploads/" });
router.post("/upload", upload.single("image"), uploadCandidate);

router.get("/list", candidateList);

module.exports = router;
