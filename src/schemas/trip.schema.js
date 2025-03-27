const { z } = require("zod");

const CreateTripSchema = z.object({
  user: z.string(),
  userPrompts: z.array(z.string()).nonempty(),
});

module.exports = { CreateTripSchema };
