const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TimeExhibit = require("./TimeExhibit");

const daySchema = new Schema ({
    day : [TimeExhibit]
});

const DaySchema = mongoose.model("DaySchema", daySchema);

module.exports = DaySchema;