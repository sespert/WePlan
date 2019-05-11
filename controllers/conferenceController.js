const db = require("../models");

// Defining methods for the conferenceController
module.exports = {
  findAll: function(req, res) {
    db.Conference
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  create: function(req, res) {
    db.Conference
      .create(req.body)
      .then(function(dbConference) {
        return db.Event.findOneAndUpdate({_id: "5cd6f97d2e446523682e09f2"}, {$set: {conferences: dbConference._id}});
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
};
