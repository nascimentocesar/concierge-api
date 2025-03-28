const { z } = require("zod");
const { CreateItinerarySchema } = require("./itinerary.schema");

const CreateTripSchema = z.object({
  user: z.string(),
  userPrompts: z.array(z.string()).nonempty(),
});

const UpdateTripSchema = z.object({
  userPrompts: z.array(z.string()).nonempty().optional(),
  itineraries: z.array(CreateItinerarySchema).nonempty().optional(),
});

module.exports = { CreateTripSchema, UpdateTripSchema };
