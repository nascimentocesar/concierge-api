const { z } = require("zod");
const { CreateItinerarySchema } = require("./itinerary.schema");
const { CreateFlightOptionSchema } = require("./flightOption.schema");

const CreateTripSchema = z.object({
  prompts: z.array(z.string()).nonempty(),
  user: z.string(),
});

const UpdateTripSchema = z.object({
  flightOptions: z.array(CreateFlightOptionSchema).nonempty().optional(),
  itineraries: z.array(CreateItinerarySchema).nonempty().optional(),
  prompts: z.array(z.string()).nonempty().optional(),
});

module.exports = { CreateTripSchema, UpdateTripSchema };
