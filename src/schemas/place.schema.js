const { z } = require("zod");

const CreatePlaceSchema = z.object({
  data: z.record(z.string(), z.any()),
});

module.exports = { CreatePlaceSchema };
