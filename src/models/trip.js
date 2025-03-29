const mongoose = require("mongoose");
const Itinerary = require("./itinerary");
const Flight = require("./flight");

const schema = new mongoose.Schema(
  {
    flights: { type: [Flight.schema], default: [] },
    itineraries: { type: [Itinerary.schema], default: [] },
    isComplete: { type: Boolean, default: false },
    prompt: { type: String, required: true },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", schema);

module.exports = Trip;
