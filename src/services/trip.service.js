const { appDebug } = require("../infrastructure/debug");
const Trip = require("../models/trip");
const {
  CreateTripSchema,
  UpdateTripSchema,
} = require("../schemas/trip.schema");
const { generateFlightOptions } = require("./flightOption.service");
const { generateItineraries } = require("./itinerary.service");

const createTrip = async (data) => Trip.create(CreateTripSchema.parse(data));

const generateTrip = async ({ tripId }) => {
  let trip = await Trip.findById(tripId);
  const prompt = trip.prompts[trip.prompts.length - 1];
  const flights = await generateFlightOptions(prompt);
  trip = await updateTrip(tripId, flights);
  const itineraries = await generateItineraries(prompt, trip.flightOptions);
  return await updateTrip(tripId, itineraries);
};

const updateTrip = async (tripId, data) => {
  return Trip.findByIdAndUpdate(tripId, UpdateTripSchema.parse(data), {
    new: true,
  });
};

module.exports = {
  createTrip,
  generateTrip,
  updateTrip,
};
