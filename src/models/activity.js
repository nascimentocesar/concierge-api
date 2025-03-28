const mongoose = require("mongoose");
const Place = require("./place");

const schema = new mongoose.Schema({
  description: { type: String, required: false },
  endsAt: { type: Date, required: true },
  estimateCost: { type: Number, required: true },
  estimateDuration: { type: Number, required: true },
  location: { type: String, required: true },
  name: { type: String, required: true },
  place: { type: Place.schema, required: false },
  startsAt: { type: Date, required: true },
});

const Activity = mongoose.model("Activity", schema);

module.exports = Activity;
