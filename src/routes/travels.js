const express = require("express");
const Travel = require("../models/travel");
const { mqChannel } = require("../infrastructure/rabbitmq");
const router = express.Router();

router.get("/", async (_req, res) => {
  const travels = await Travel.find({});
  res.send(travels);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const travels = await Travel.findById(id);
  res.send(travels);
});

router.post("/", async (req, res) => {
  const { prompt, user } = req.body;
  const travel = await Travel.create({ prompt, user });

  try {
    const channel = await mqChannel();
    channel.sendToQueue("default", Buffer.from(JSON.stringify({})), {
      persistent: true,
    });
  } catch (error) {
    console.error(error);
  }

  res.status(201).send(travel);
});

module.exports = router;
