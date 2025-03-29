const { z } = require("zod");
const { CreateActivitySchema } = require("./activity.schema");

const CreateItinerarySchema = z.object({
  activities: z.array(CreateActivitySchema),
  estimateCost: z.number(),
  summary: z.string(),
  title: z.string(),
});

const GenerateItineraryRecommendationsSchema = z.object({
  itineraries: z.array(CreateItinerarySchema),
});

module.exports = {
  CreateItinerarySchema,
  GenerateItineraryRecommendationsSchema,
};
