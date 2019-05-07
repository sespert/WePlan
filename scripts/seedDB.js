const mongoose = require("mongoose");
const db = require("../models/event");

// This file empties the collection and inserts the events below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/weplan"
);

const conventionSeed = [
  {
    name: "Industrial Exchange 2019",
    place: "Miami Beach Convention Center",
    subject: "Over 2,500 attendees from middle-market industrial companies and the private equity community will meet in Miami Beach in May 2019. Don’t miss out on networking opportunities with the group of high level decision makers.",
    date: "2019-5-6",
    numOfDays: 3,
    startTime: 1200,
    endTime: 1100
  
  }
];

db.Convention
  .remove({})
  .then(() => db.Convention.collection.insertMany(conventionSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
