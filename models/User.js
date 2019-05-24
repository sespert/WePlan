const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 13;
const Schema = mongoose.Schema;
const Event = require("./event");
const Day = require("./Day");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true
    },
    company: {
        type: String, 
        default: "personal"
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address"
        ]
    },
    password: {
        type: String,
        required: true
    },
    conferences: [{
        type: Schema.Types.ObjectId,
        ref: "Conference"
    }],
    events: [{
        type: Schema.Types.ObjectId,
        ref: "Event"
    }]
});

// Pre save hook to hash passwords
userSchema.pre("save", function(next) {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            console.log(user.password);
            next();
        });
    });
});

// Helper method for password comparison promise based
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
