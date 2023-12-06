const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../Model/user.model.js");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../Model/blacklist.model.js");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, pass } = req.body;
  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      res.status(400).send({ msg: "User already registered" });
    } else {
      bcrypt.hash(pass, 5, async (err, hash) => {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          const user = new UserModel(req.body);
          user.username = username;
          user.email = email;
          user.pass = hash;
          await user.save();
          res
            .status(200)
            .send({ success: "user has been registered", user: req.body });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(pass, user.pass, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { username: user.username, userID: user._id },
          "masai"
        );
        res.status(200).send({ msg: "login Successful", token: token });
      } else {
        res.status(400).send({ msg: "login Failed" });
      }
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.get("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;
    const blacklist = await BlacklistModel({ blacklist: token });
    await blacklist.save();
    res.status(200).send({ msg: "logout Successful!" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  userRouter,
};
