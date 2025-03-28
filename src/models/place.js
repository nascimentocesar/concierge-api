const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  data: { type: Object, required: true },
});

const Place = mongoose.model("Place", schema);

module.exports = Place;
