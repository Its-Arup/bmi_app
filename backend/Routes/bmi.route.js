const express = require("express");
const { auth } = require("../Middleware/auth.middleware");
const { BmiModel } = require("../Model/bmi.model");

const bmiRouter = express.Router();

bmiRouter.use(auth);

bmiRouter.post("/add", async (req, res) => {
  try {
    const newBmi = await BmiModel(req.body);
    await newBmi.save();
    res.status(200).send({ msg: "BMI added successfully ! ", data: newBmi });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

bmiRouter.get("/getall", async (req, res) => {
  try {
    const allBmi = await BmiModel.find({ userID: req.body.userID });
    res.status(200).send({ msg: "all bmi", data: allBmi });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  bmiRouter,
};
