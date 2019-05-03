const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DayExhibit = require("./DayExhibit");
const Event = require("./Event");

const exhibitorSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    representant: {
        type: String,
        required: true
    },
    booth: {
        type:  String,
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: "Event"
    },
    sched: [DayExhibit]

});

const Exhibitor = mongoose.model("Exhibitor", exhibitorSchema);

module.exports = Exhibitor;