const express = require("express");
const router = express.Router();
const multer = require("multer");
// const cloudinary = require("../config/cloudinary");

const {
  candidateList,
  uploadCandidate,
  eachCandidate,
  deleteCandidate,
  updateCandidate,
} = require("../controllers/candidateController");

// uploading new candidate
const upload = multer({ dest: "uploads/" });
router.post("/upload", upload.single("image"), uploadCandidate);

// import all candidate from db
router.get("/list", candidateList);

// import each candidate
router.get("/:id", eachCandidate);

//update candidate
router.put("/update/:id", upload.single("image"), updateCandidate);

// delete each candidate
router.delete("/:id", deleteCandidate);

module.exports = router;
