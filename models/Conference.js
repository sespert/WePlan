const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const Event = require("./Event");

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
        type: String,
    },
    time:{
        type: String,
    },    
    duration:{
        type: Number
    },
    eventId: {
        type: String
    }
});

const Conference = mongoose.model("Conference", conferenceSchema);

module.exports = Conference;