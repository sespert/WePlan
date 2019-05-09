const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Conference = require("./conference");
const Exhibitor = require("./Exhibitor");

const timeSchema = new Schema ({
    schedule: {
        day: Number,
        time: Number,
        duration: Number
    },
    conf: [{
        type: Schema.Types.ObjectId,
        ref: "Conference"
    }],
    exhibit: [{
        type: Schema.Types.ObjectId,
        ref: "Exhibitor"
    }],
    meeting_type:{
        type: String,
        default: null
    }
});

const Time = mongoose.model("Time", timeSchema);

module.exports = Time;