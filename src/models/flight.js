const mongoose = require("mongoose");

const segmentSchema = new mongoose.Schema(
  {
    airline: { type: String, required: true },
    airLineLogo: { type: String },
    arrivalAirportCode: { type: String, required: true },
    arrivalAirportName: { type: String, required: true },
    arrivalDate: { type: String, required: true },
    departureAirportCode: { type: String, required: true },
    departureAirportName: { type: String, required: true },
    departureDate: { type: String, required: true },
    duration: { type: Number, required: true },
    flightNumber: { type: String, required: true },
  },
  { _id: false }
);

const flightSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  segments: { type: [segmentSchema], required: true },
  totalDuration: { type: Number, required: true },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
