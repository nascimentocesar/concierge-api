const { z } = require("zod");

const CreateActivitySchema = z.object({
  description: z.string(),
  endsAt: z.string(),
  estimateCost: z.number(),
  estimateDuration: z.number(),
  location: z.string(),
  name: z.string(),
  startsAt: z.string(),
});

module.exports = { CreateActivitySchema };
