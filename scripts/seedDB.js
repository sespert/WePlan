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

const eventSeed = [
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

db.Event
  .remove({})
  .then(() => db.Event.collection.insertMany(eventSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  const confSeed = [
     {
      title: "",
      speakers: [],
      decription: "",
      room: "",
      schedule: [{
          day: "",
          time: "",
          duration: ""
      }],
    
  }
  ];

  db.Conference
  .remove({})
  .then(() => db.Conference.collection.insertMany(confSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


