const db = require("../models");

// Defining methods for the conventionController
module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // find: function(req, res) {
  //   db.User
  //     .find({ email: { $elemMatch: req.query } })
       
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  find: (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    //?token=test


    // verify the token is one of a kind
    db.UserSession.find({_id: token, isDeleted: false}, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        } else {
            return res.send({
                success: true,
                message: 'Good'
            });
        }
    })

  },

  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // create: function(req, res) {
  //   db.User
  //   // .save(req.body)
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
      
  // },
  create: (req, res, next) => {
    const { body } = req;
    const {
        name,
        company,
        password
    } = body;
    let {
        email
    } = body;
     
    if(!name) {
        return res.send({
            success: false,
            message: 'Error: Name cannot be blank'
        });
    }
    if(!email) {
        return res.send({
            success: false,
            message: 'Error: email cannot be blank'
        });
    }
    if(!password) {
        return res.send({
            success: false,
            message: 'Error: password cannot be blank'
        });
    }

    email = email.toLowerCase();

    db.User.find({email: email}, (err, previousUsers) => {
        // Verify user doesn't exist
        if(err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if(previousUsers.length > 0){
            return res.send({
                success: false,
                message: 'Account already exists'
            });
        }
        // Save new User
        const newUser = new db.User();

        newUser.email = email;
        newUser.name = name;
        newUser.company = company;
        newUser.password = password;

        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Signed Up'
            });
        });
    });

  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  signin: (req, res, next) => {
    const { body } = req;
    console.log(body);

    const {
        password
    } = body;
    let {
        email
    } = body;

    if(!email) {
        return res.send({
            success: false,
            message: 'Error: email cannot be blank'
        });
    }
    if(!password) {
        return res.send({
            success: false,
            message: 'Error: password cannot be blank'
        });
    }

    email = email.toLowerCase();

    db.User.find({email: email}, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid Email'
            });
        } 

        const logUser = users[0];
        if(!logUser.comparePassword(password)) {
            return res.send({
                success: false,
                message: "Error: Invalid Password"
            });
        }

        // Otherwise, the user is valid create new user session
        const userSession = new db.UserSession();
        userSession.userId = logUser._id;
        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            // once the session has succesfully started and saved, create a token and pass the session id (doc._id) as a token
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id
            });
        });

    });
  }
};
