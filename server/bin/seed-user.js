require("dotenv").config();
require("../config/dbConnection"); // fetch the db connection

const UserModel = require("../models/User");

const users = [
  {
    username: "toto",
    email: "toto@gmail.com",
    password: "1234",
    phone_number: 089847565,
  },

  {
    username: "tata",
    email: "tata@gmail.com",
    password: "1234",
    phone_number: 075666460,
  },
];

async function insertUsers() {
  try {
    await UserModel.deleteMany();
    const inserted = await UserModel.insertMany(users);
    console.log(`seed users done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
}

insertUsers();
