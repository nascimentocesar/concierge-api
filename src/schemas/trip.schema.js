const { z } = require("zod");
const { CreateItinerarySchema } = require("./itinerary.schema");
const { CreateFlightSchema } = require("./flight.schema");

const CreateTripSchema = z.object({
  prompt: z.string(),
});

const UpdateTripSchema = z.object({
  flights: z.array(CreateFlightSchema).nonempty().optional(),
  isComplete: z.boolean().optional(),
  itineraries: z.array(CreateItinerarySchema).nonempty().optional(),
  prompt: z.string().nonempty().optional(),
});

module.exports = { CreateTripSchema, UpdateTripSchema };
