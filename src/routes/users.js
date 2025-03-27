const express = require("express");
const User = require("../models/user");
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
  const { email } = req.body;
  const user = await User.create({ email });
  res.status(201).send(user);
});

module.exports = router;
