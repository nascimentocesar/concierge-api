const express = require("express");
const User = require("../models/user");
const { CreateUserSchema } = require("../schemas/user.schema");
const router = express.Router();

router.get("/", async (_req, res) => {
  const users = await User.find({});
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const users = await User.findById(id);
  res.send(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(CreateUserSchema.parse(req.body));
  res.status(201).send(user);
});

module.exports = router;
