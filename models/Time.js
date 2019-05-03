const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Conference = require("./Conference");
const Exhibitor = require("./Exhibitor");

const timeSchema = new Schema ({
    hour: {
        type: Date,
        default: Date.now
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