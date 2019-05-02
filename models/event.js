const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  place: { type: String, required: true },
  speaker: { type: String, required: true },
  subject: String,
  date: { type: Date, default: Date.now },
  time: Number
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
