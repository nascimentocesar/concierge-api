const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  data: { type: Object },
});

const Place = mongoose.model("Place", schema);

module.exports = Place;
