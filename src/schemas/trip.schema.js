const { z } = require("zod");
const { CreateItinerarySchema } = require("./itinerary.schema");
const { CreateFlightSchema } = require("./flight.schema");

const CreateTripSchema = z.object({
  prompt: z.string(),
});

const UpdateTripSchema = z.object({
  departureFlight: CreateFlightSchema.optional(),
  isComplete: z.boolean().optional(),
  itineraries: z.array(CreateItinerarySchema).nonempty().optional(),
  prompt: z.string().nonempty().optional(),
  returnFlight: CreateFlightSchema.optional(),
});

module.exports = { CreateTripSchema, UpdateTripSchema };
