const mongoose = require("mongoose");
const Event = require("./event");

const schema = new mongoose.Schema({
  events: { type: [Event.schema], default: [] },
});

const Itinerary = mongoose.model("Itinerary", schema);

module.exports = Itinerary;
