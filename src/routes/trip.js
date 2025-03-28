const express = require("express");
const { mqSend, mqEvents } = require("../infrastructure/rabbitmq");
const Trip = require("../models/trip");
const { createTrip, generateTrip } = require("../services/trip.service");
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
  const trip = await createTrip(req.body);
  // mqSend(mqEvents.generateTrip, { tripId: trip._id });
  generateTrip({ tripId: trip._id });
  res.status(201).send(trip);
});

module.exports = router;
