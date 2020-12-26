const express = require("express");
const router = express.Router();
const con = require("../db/connection");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("Here");
});

router.post("/", (req, res) => {});

module.exports = router;
