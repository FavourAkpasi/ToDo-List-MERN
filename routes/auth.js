const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validateRegistration = require("../validation/registerValidation");
const jwt = require("jsonwebtoken");
const requiresAuth = require("../middleware/permissions");

// @route GET/api/auth

router.get("/test", (req, res) => {
  res.send("Auth route");
});

router.post("/register", async (req, res) => {
  try {
    const { errors, isValid } = validateRegistration(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const existingEmail = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"),
    });

    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "There is already a user with this email" });
    }

    const newUser = new User({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      name: req.body.name,
    });

    // save new user and log them in with cookies

    const savedUser = await newUser.save();

    const payload = { userId: savedUser._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("accessToken", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const returnedUser = { ...savedUser._doc };

    delete returnedUser.password;

    return res.json(returnedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.messgae);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"),
    });

    if (!user) {
      return res.status(400).json({ error: "invalid login credentials" });
    }

    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!matchPassword) {
      return res.status(400).json({ error: "invalid login credentials" });
    }

    const payload = { userId: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("accessToken", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const returnedUser = { ...user._doc };

    delete returnedUser.password;

    return res.json({ token: token, user: returnedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

router.get("/current", requiresAuth, (req, res) => {
  if (!req.user) {
    return res.status(401).send("unauthorised");
  }
  return res.json(req.user);
});

router.put("/logout", requiresAuth, async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

module.exports = router;
