const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TimeExhibit = require("./TimeExhibit");

const dayExhibit = new Schema ({
    day : [{
        type: Schema.Types.ObjectId,
        ref:"TimeExhibit"
    }]
});

const DayExhibit = mongoose.model("DayExhibit", dayExhibit);

module.exports = DayExhibit;