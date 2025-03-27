const mongoose = require("mongoose");
const appDebug = require("../infrastructure/debug");

const dbConnect = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => appDebug("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
};

module.exports = dbConnect;
