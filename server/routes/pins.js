const router = require("express").Router();
const Pin = require("../models/Pin");

//Create new pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);

  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    console.log(pins);
    res.status(200).json(pins);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
