

let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  cnfPassword: { type: String, required: true },
},{versionKey:false});

let UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };