const { z } = require("zod");

const CreateUserSchema = z.object({
  email: z.string().email(),
});

module.exports = { CreateUserSchema };
