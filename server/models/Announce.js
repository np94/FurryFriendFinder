const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announceSchema = new Schema({
  title: String,
  name: String,
  location: String,
  email: String,
  image: String,
  description: String,
  pet_type: String,
  missing: Boolean,
  found: Boolean,
  comments: String,
  id_user: String,
});

const Announce = mongoose.model("Announce", announceSchema);

module.exports = Announce;
