const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
        type:[Day]                
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
