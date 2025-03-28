const { z } = require("zod");
const { CreateActivitySchema } = require("./activity.schema");

const CreateItinerarySchema = z.object({
  activities: z.array(CreateActivitySchema),
  estimateCost: z.number(),
  summary: z.string(),
});

const CreateItineraryListSchema = z.object({
  itineraries: z.array(CreateItinerarySchema),
});

module.exports = { CreateItineraryListSchema, CreateItinerarySchema };
