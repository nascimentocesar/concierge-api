const mongoose = require("mongoose");
const Activity = require("./activity");

const schema = new mongoose.Schema({
  activities: { type: [Activity.schema], default: [] },
  estimateCost: { type: Number },
  flightId: { type: String },
  summary: { type: String },
});

const Itinerary = mongoose.model("Itinerary", schema);

module.exports = Itinerary;
