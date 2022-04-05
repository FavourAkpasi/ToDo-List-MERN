const { request } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @route GET/api/auth/test

router.get("/test", (req, res) => {
  res.send("Auth route");
});

router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      name: req.body.name,
    });
    const savedUser = await newUser.save();
    return res.json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.messgae);
  }
});

module.exports = router;
