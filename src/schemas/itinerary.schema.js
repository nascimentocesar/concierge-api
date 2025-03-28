const { z } = require("zod");
const { CreateActivitySchema } = require("./activity.schema");

const CreateItinerarySchema = z.object({
  activities: z.array(CreateActivitySchema),
  estimateCost: z.number(),
  flightId: z.string(),
  summary: z.string(),
});

const GenerateItineraryRecommendationsSchema = z.object({
  itineraries: z.array(CreateItinerarySchema),
});

module.exports = {
  CreateItinerarySchema,
  GenerateItineraryRecommendationsSchema,
};
