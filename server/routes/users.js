const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 12;

// Create new user
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });

    await newUser.save();
    res.status(200).json(newUser._id);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.get("/login", async (req, res) => {
  try {
    const user = await User.find({
      username: req.body.username,
    });

    //Unsuccesful login
    !user && res.status(400).json("Wrong username or password");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong username or password");

    // Correct login credentials
    res.status(200).json({ _id: req.body.id, username: req.body.username });
  } catch (err) {
    response.status(500).json(err);
  }
});

module.exports = router;
