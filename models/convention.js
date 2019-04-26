const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conventionSchema = new Schema({
  place: { type: String, required: true },
  speaker: { type: String, required: true },
  subject: String,
  date: { type: Date, default: Date.now },
  time: Number
});

const Convention = mongoose.model("Convention", conventionSchema);

module.exports = Convention;
