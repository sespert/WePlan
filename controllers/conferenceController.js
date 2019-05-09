const db = require("../models");

// Defining methods for the conventionController
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
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
};
