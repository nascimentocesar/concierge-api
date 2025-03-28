const mongoose = require("mongoose");
const Activity = require("./activity");

const schema = new mongoose.Schema({
  activities: { type: [Activity.schema], default: [] },
  estimateCost: { type: Number, required: true },
  flightOptionId: { type: String, required: true },
  summary: { type: String, required: true },
});

const Itinerary = mongoose.model("Itinerary", schema);

module.exports = Itinerary;
