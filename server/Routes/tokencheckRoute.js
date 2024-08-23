const express = require("express");
const router = express.Router();
const adminTokenvalidation = require("../utils/tokenvalidation");

router.get("/admintoken-validate", adminTokenvalidation);
module.exports = router;
