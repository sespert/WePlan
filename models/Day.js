const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Time = require("./Time");

const daySchema = new Schema ({
    day : [{
        type: Schema.Types.ObjectId,
        ref:"Time"
    }]
});

const Day = mongoose.model("Day", daySchema);

module.exports = Day;