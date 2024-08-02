// const express = require("express");
const Candidate = require("../models/candidatesModel");

const candidateList = async () => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = candidateList;
