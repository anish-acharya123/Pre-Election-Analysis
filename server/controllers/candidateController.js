// const express = require("express");
const Candidate = require("../models/candidatesModel");
const cloudinary = require("../config/cloudinary");

const candidateList = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const uploadCandidate = async (req, res) => {
  const { name, description, candidateId, party } = req.body;
  const file = req.file;
  // console.log(file);
  // console.log(cloudinary);

  try {
    if (!name || !description || !candidateId || !file || !party) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields" });
    }

    const findUser = await Candidate.findOne({ candidateId });
    if (findUser) {
      return res
        .status(409)
        .json({ msg: "User with this id is already register" });
    }
    // console.log(result);
    const lastCandidate = await Candidate.findOne().sort({ id: -1 });
    const id = lastCandidate ? lastCandidate.id + 1 : 1;

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "candidates",
    });

    const candidate = new Candidate({
      id,
      name,
      description,
      candidateId,
      party,
      photo: result.secure_url,
    });

    await candidate.save();
    res.status(201).json({ msg: "Candidate register successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { candidateList, uploadCandidate };
