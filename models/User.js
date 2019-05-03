const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 13;
const Schema = mongoose.Schema;

const Day = require("./Day");
const Event = require("./Event");

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
    role: {
        type: Boolean,
        required: true,
        default: false //false for attendee, true for admin
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
    schedule:{
        type:[Day], 
        required: false              
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: "Event"
    }
});

// Pre save hook to hash passwords
UserSchema.pre("save", function(next) {
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
UserSchema.methods.comparePassword = function (candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) reject(err, "passwords not a match");
            return resolve(isMatch);
        });
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
