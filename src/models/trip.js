const mongoose = require("mongoose");
const Itinerary = require("./itinerary");
const Flight = require("./flight");

const schema = new mongoose.Schema(
  {
    departureFlight: { type: Flight.schema },
    itineraries: { type: [Itinerary.schema], default: [] },
    isComplete: { type: Boolean, default: false },
    prompt: { type: String, required: true },
    returnFlight: { type: Flight.schema },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", schema);

module.exports = Trip;
