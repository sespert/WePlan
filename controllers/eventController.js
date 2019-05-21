const db = require("../models");

// Defining methods for the conventionController
module.exports = {
  findAll: function(req, res) {
    db.Event
      .find(req.query)
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findSession: function (req, res) {
    console.log(req.params);
    const { sessionToken } = req.params;

    db.UserSession.findById(sessionToken, (err, sessions) => {
      console.log("sessio token ", sessionToken);
      console.log("session data ", sessions);
      if (err) {
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      return res.send({
        success: true,
        userId: sessions.userId
      })
    })
  },

  findEventsById: function(req, res) {
    db.Event
      .find({admin: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  findById: function(req, res) {
    db.Event
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    db.Event
      .create(req.body)
      // .then(function(dbEvent) {
      //   return db.User.findOneAndUpdate({_id: req.params.id}, {event: dbEvent._id}, {new:true});
      // })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  update: function(req, res) {
    db.Event
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  remove: function(req, res) {
    db.Event
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
