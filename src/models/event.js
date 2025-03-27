const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: false },
});

const Event = mongoose.model("Event", schema);

module.exports = Event;
