const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Time = require("./Time");

const daySchema = new Schema ({
    day : [Time]
});

const Day = mongoose.model("Day", daySchema);

module.exports = Day;