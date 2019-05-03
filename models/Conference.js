const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Event = require("./Event");

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
    event: {
        type: Schema.Types.ObjectId,
        ref: "Event"
    },
    schedule: {
        day: Number,
        time: Number,
        duration: Number
    }
});

const Conference = mongoose.model("Conference", conferenceSchema);

module.exports = Conference;