const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announceSchema = new Schema({
  title: String,
  name: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  email: String,
  image: String,
  description: String,
  pet_type: String,
  status: [
    {
      type: String,
      enum: ["Missing", "Found"],
    },
  ],
  comments: String,
  formattedAddress: String,
  id_user: String,
});

const Announce = mongoose.model("Announce", announceSchema);

module.exports = Announce;
