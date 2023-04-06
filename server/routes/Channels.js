const express = require("express");
const router = express.Router();
const { Channels } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

/**
 * @route GET /api/channels
 * @desc Get all channels
 */
router.get("/", validateToken, async (req, res) => {
  const listOfChannels = await Channels.findAll();
  res.json(listOfChannels);
});

/**
 * @route GET /api/channels/:channelId
 * @desc Get a channel by id
 */
router.get("/:channelId", async (req, res) => {
  const channelId = req.params.channelId;
  const channel = await Channels.findByPk(channelId);
  res.json(channel);
});

/**
 * @route POST /api/channels
 * @desc Create a new channel
 */
router.post("/", validateToken, async (req, res) => {
  const channel = req.body;
  await Channels.create(channel);
  res.json(channel);
});

/**
 * @route DELETE /api/channels/:channelId
 * @desc Delete a channel by id
 */
router.delete("/:channelId", validateToken, async (req, res) => {
  const channelId = req.params.channelId;

  await Channels.destroy({
    where: {
      id: channelId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
