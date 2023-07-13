
let express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
let userRoute = express.Router();
var jwt = require("jsonwebtoken");

userRoute.get("/", async (req, res) => {
  res.status(200).send("user route");
});

userRoute.post("/signup", async (req, res) => {
  let { email, password, cnfPassword } = req.body;
  if (password === cnfPassword) {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (hash) {
          let user = new UserModel({
            email,
            password: hash,
            cnfPassword: hash,
          });
          await user.save();
          res.status(200).send({ msg: "new user has been created" });
        } else {
          res.status(400).send(err);
        }
      });
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res
      .status(400)
      .send({ msg: "password and Conferm password id not matching" });
  }
});

userRoute.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign({ authorId: user._id }, "ranjan");
          res.status(200).send({ msg:  "Login Successful", token: token });
        } else {
          res.status(400).send({ msg: "Invalid Credentials" });
        }
      });
    } else {
      res.status(400).send({ msg: "please signup first" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = { userRoute };