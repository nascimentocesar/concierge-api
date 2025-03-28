const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  data: { type: Object },
});

const Flight = mongoose.model("Flight", schema);

module.exports = Flight;
