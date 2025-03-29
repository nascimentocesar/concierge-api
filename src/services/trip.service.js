const Trip = require("../models/trip");
const {
  CreateTripSchema,
  UpdateTripSchema,
} = require("../schemas/trip.schema");
const { generateFlightRecommendations } = require("./flight.service");
const { generateItineraryRecommendations } = require("./itinerary.service");

const createTrip = async (data) => Trip.create(CreateTripSchema.parse(data));

const generateTripRecommendations = async (tripId) =>
  generateFlightRecommendations(tripId)
    .then(() => generateItineraryRecommendations(tripId))
    .then(() => updateTrip(tripId, { isComplete: true }));

const updateTrip = async (tripId, data) =>
  Trip.findByIdAndUpdate(tripId, UpdateTripSchema.parse(data), {
    new: true,
  });

module.exports = {
  createTrip,
  generateTripRecommendations,
  updateTrip,
};
