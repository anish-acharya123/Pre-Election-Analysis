// const express = require("express");
const Candidate = require("../models/candidatesModel");
const cloudinary = require("../config/cloudinary");

/// import all candidate from db
const candidateList = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

/// upload new candidate in db
const uploadCandidate = async (req, res) => {
  const { name, description, candidateId, party } = req.body;
  console.log(process.env.CLOUDINARY_CLOUD_NAM);
  const file = req.file;
  try {
    console.log(name, description, candidateId, file, party);
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
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

// import Each candidate from db
const eachCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findOne({ id });
    if (!candidate) {
      return res
        .status(400)
        .json({ sucess: false, msg: "Candidate doesn't exist." });
    }

    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//update candidate with id
const updateCandidate = async (req, res) => {
  const { id } = req.params;
  const { name, description, candidateId, party, image } = req.body;
  const file = req.file;

  try {
    let candidate = await Candidate.findOne({ id });

    if (!candidate) {
      return res.status(400).json({ msg: "Candidate not found" });
    }

    if (file && image) {
      await cloudinary.uploader.destroy(image);
    }

    let imageUrl = "";
    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "candidates",
      });
      imageUrl = result.secure_url;
    }

    if (name) candidate.name = name;
    if (description) candidate.description = description;
    if (candidateId) candidate.candidateId = candidateId;
    if (party) candidate.party = party;
    if (file) candidate.photo = imageUrl;

    await candidate.save();

    res.status(200).json({ msg: " Candidate Updated succesfully" });
  } catch (e) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

// delete each candidate from there id
const deleteCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const candidateDelete = await Candidate.findOneAndDelete({ id });
    if (!candidateDelete) {
      return res
        .status(400)
        .json({ success: false, msg: "Candidate doesn't exist" });
    }

    res
      .status(200)
      .json({ sucess: true, msg: "Candidate Delete Successfully." });
  } catch (error) {
    res.statu(500).json({ msg: "Internal server Error", error });
  }
};

module.exports = {
  candidateList,
  uploadCandidate,
  eachCandidate,
  deleteCandidate,
  updateCandidate,
};
