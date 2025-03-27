const mongoose = require("mongoose");
const Itinerary = require("./itinerary");

const schema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    userPrompts: { type: [String], default: [] },
    itineraries: { type: [Itinerary.schema], default: [] },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", schema);

module.exports = Trip;
