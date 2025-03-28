const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  description: { type: String, required: false },
  endsAt: { type: Date, required: true },
  estimateCost: { type: Number, required: true },
  estimateDuration: { type: Number, required: true },
  location: { type: String, required: true },
  name: { type: String, required: true },
  startsAt: { type: Date, required: true },
});

const Activity = mongoose.model("Activity", schema);

module.exports = Activity;
