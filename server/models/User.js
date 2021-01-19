const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: Number,
  profileImg: {
    type: String,
    default:
      "https://res.cloudinary.com/dqlkhve6f/image/upload/v1610985526/andy-holmes-D6TqIa-tWRY-unsplash_jzeoth.jpg",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
