const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
