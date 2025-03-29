const express = require("express");
const { mqSend, mqEvents } = require("../infrastructure/rabbitmq");
const Trip = require("../models/trip");
const {
  createTrip,
  generateTripRecommendations,
} = require("../services/trip.service");
const router = express.Router();

router.delete("/", async (_req, res, next) => {
  try {
    res.send(await Trip.deleteMany({}));
  } catch (error) {
    next(error);
  }
});

router.get("/", async (_req, res, next) => {
  try {
    res.send(await Trip.find({}));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.send(await Trip.findById(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const trip = await createTrip(req.body);
    // mqSend(mqEvents.generateTripRecommendations, { tripId: trip._id });
    generateTripRecommendations(trip._id);
    res.status(201).send(trip);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
