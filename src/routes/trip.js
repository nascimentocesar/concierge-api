const express = require("express");
const { mqSend, mqEvents } = require("../infrastructure/rabbitmq");
const Trip = require("../models/trip");
const { CreateTripSchema } = require("../schemas/trip.schema");
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
  const trip = await Trip.create(CreateTripSchema.parse(req.body));
  mqSend(mqEvents.tripGenerateItinerary, { tripId: trip._id });
  res.status(201).send(trip);
});

module.exports = router;
