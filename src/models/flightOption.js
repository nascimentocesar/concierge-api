const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  data: { type: Object, required: true },
});

const FlightOption = mongoose.model("FlightOption", schema);

module.exports = FlightOption;
