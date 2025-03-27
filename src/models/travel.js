const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Travel = mongoose.model("Travel", schema);

module.exports = Travel;
