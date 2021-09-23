const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 12;

// Create new user
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });

    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
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
    res.status(500).json(err);
  }
});

module.exports = router;
