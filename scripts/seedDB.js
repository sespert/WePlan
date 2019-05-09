const mongoose = require("mongoose");
const db = require("../models");

// This file empties the collection and inserts the events below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/weplanDB"
);

const userSeed = [
  {
    name: "Shirley",
    company: "SEG",
    email: "se@menubar.com",
    password: "123456",
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
