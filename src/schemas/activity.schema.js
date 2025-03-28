const { z } = require("zod");
const { CreatePlaceSchema } = require("./place.schema");

const CreateActivitySchema = z.object({
  description: z.string(),
  endsAt: z.string(),
  estimateCost: z.number(),
  estimateDuration: z.number(),
  location: z.string(),
  name: z.string(),
  startsAt: z.string(),
});

const UpdateActivitySchema = z.object({
  place: CreatePlaceSchema,
});

module.exports = { CreateActivitySchema, UpdateActivitySchema };
