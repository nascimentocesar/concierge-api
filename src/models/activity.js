const mongoose = require("mongoose");
const Place = require("./place");

const schema = new mongoose.Schema({
  description: { type: String },
  endsAt: { type: Date },
  estimateCost: { type: Number },
  estimateDuration: { type: Number },
  location: { type: String },
  name: { type: String },
  place: { type: Place.schema },
  startsAt: { type: Date },
});

const Activity = mongoose.model("Activity", schema);

module.exports = Activity;
