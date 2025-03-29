const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const tripsRouter = require("./routes/trip");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/trips", tripsRouter);

app.use((error, _req, res, _next) => {
  console.error("DEU ERRO");
  console.error(error.stack);

  res.status(500).json({
    message: error.message,
  });
});

module.exports = app;
