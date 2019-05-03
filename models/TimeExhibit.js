const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User ");

const timeExhibitSchema = new Schema ({
    hour: Number,
    available: {
        type: Boolean,
        default: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

const TimeExhibit = mongoose.model("Time", timeExhibitSchema);

module.exports = TimeExhibit;