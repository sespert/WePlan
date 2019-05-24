const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conferenceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    speakers: [],
    description: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },    
    day: {
        type: Date,
    },
    time:{
        type: String,
    },    
    duration:{
        type: Number
    },
    eventId: {
        type: String
    },
    eventName: {
        type: String
    }
});

const Conference = mongoose.model("Conference", conferenceSchema);

module.exports = Conference;