const { z } = require("zod");

const CreateEventSchema = z.object({
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string(),
  description: z.string().optional(),
});

module.exports = { CreateEventSchema };
