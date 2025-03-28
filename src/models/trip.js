const mongoose = require("mongoose");
const Itinerary = require("./itinerary");
const FlightOption = require("./flightOption");

const schema = new mongoose.Schema(
  {
    flightOptions: { type: [FlightOption.schema], default: [] },
    itineraries: { type: [Itinerary.schema], default: [] },
    prompts: { type: [String], default: [] },
    user: { type: String, required: true },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", schema);

module.exports = Trip;
