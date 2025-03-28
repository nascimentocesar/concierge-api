const { z } = require("zod");
const { CreateActivitySchema } = require("./activity.schema");

const CreateItinerarySchema = z.object({
  activities: z.array(CreateActivitySchema),
  estimateCost: z.number(),
  flightOptionId: z.string(),
  summary: z.string(),
});

const GenerateItinerariesSchema = z.object({
  itineraries: z.array(CreateItinerarySchema),
});

module.exports = { CreateItinerarySchema, GenerateItinerariesSchema };
