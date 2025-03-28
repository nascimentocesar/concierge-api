const express = require("express");
const User = require("../models/user");
const { createUser } = require("../services/user.service");
const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    res.send(await User.find({}));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.send(await User.findById(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await createUser(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
