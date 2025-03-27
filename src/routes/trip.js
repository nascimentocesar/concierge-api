const express = require("express");
const { mqSend, mqEvents } = require("../infrastructure/rabbitmq");
const Trip = require("../models/trip");
const router = express.Router();

router.get("/", async (_req, res) => {
  const trip = await Trip.find({});
  res.send(trip);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const trips = await Trip.findById(id);
  res.send(trips);
});

router.post("/", async (req, res) => {
  const { prompt, user } = req.body;
  const trip = await Trip.create({ prompt, user });
  mqSend(mqEvents.tripPromptItinerary, { tripId: trip._id });
  res.status(201).send(trip);
});

module.exports = router;
