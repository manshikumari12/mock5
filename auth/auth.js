const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, "mock", (err, decoded) => {
        if (decoded) {
          req.body.author = decoded.userId;
          next();
        } else {
          res.send({ msg: "Please login first" });
        }
      });
    } else {
      res.send({ msg: "please login first" });
    }
  };

module.exports = {auth}