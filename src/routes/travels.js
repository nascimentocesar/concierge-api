const express = require("express");
const Travel = require("../models/travel");
const router = express.Router();

router.get("/", async (_req, res) => {
  const travels = await Travel.find({});
  res.send(travels);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const travels = await Travel.findById(id);
  res.send(travels);
});

router.post("/", async (req, res, next) => {
  const { prompt } = req.body;
  const travel = await Travel.create({ prompt });
  res.status(201).send(travel);
});

module.exports = router;
