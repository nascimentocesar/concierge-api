const User = require("../models/user");
const { CreateUserSchema } = require("../schemas/user.schema");

const createUser = async (data) => User.create(CreateUserSchema.parse(data));

module.exports = {
  createUser,
};
