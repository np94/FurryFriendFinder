require("dotenv").config();
require("../config/dbConnection"); // fetch the db connection

const AnnounceModel = require("../models/Announce");

const announce = [
  {
    title: "Missing puppy",
    name: "Bob",
    location: "Bois de boulogne",
    email: "titi@gmail.com",
    image:
      "https://res.cloudinary.com/dqlkhve6f/image/upload/v1610619336/FFF/IMG-20200925-WA0011_elmdli.jpg",
    description: "White grey-ish dog, a little overweight",
    pet_type: "Pugs",
    status: "Missing",
    comments:
      "Went for a walk with him yesterday, lost in the woods-bois de boulogne at 10am",
  },
  {
    title: "Missing cat",
    name: "Nini",
    location: "Vincennes",
    email: "benoit@gmail.com",
    image:
      "https://res.cloudinary.com/dqlkhve6f/image/upload/v1610619329/FFF/17465969605906809960_d8kdag.jpg",
    description: "Grey and white, pretty eyes",
    pet_type: "Angora and british short hair mix",
    status: "Missing",
    comments: "Did not come home for a week",
  },

  {
    title: "Expensive dog found",
    name: "Lulu",
    location: "Paris",
    email: "bernadette@gmail.com",
    image:
      "https://res.cloudinary.com/dqlkhve6f/image/upload/v1610637777/FFF/16106371573047864249374219884166_d0dj1m.jpg",
    description: "Brown and white, very playful and active dog",
    pet_type: "Sheba",
    status: "Found",
    comments: "Found it playing alone infront of my appartement building",
  },
];

async function insertAnnounce() {
  try {
    await AnnounceModel.deleteMany();
    const inserted = await AnnounceModel.insertMany(announce);
    console.log(`seed users done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
}

insertAnnounce();
