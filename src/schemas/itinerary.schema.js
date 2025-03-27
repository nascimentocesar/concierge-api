const { z } = require("zod");
const { CreateEventSchema } = require("./event.schema");

const CreateItinerarySchema = z.object({
  events: z.array(CreateEventSchema).nonempty(),
});

module.exports = { CreateItinerarySchema };
