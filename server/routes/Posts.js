const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

/**
 * @route GET /api/posts
 * @desc Get all posts
 */
router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

/**
 * @route GET /api/posts/byChannelId/:channelId
 * @desc Get all posts by channel id
 */
router.get("/byChannelId/:channelId", validateToken, async (req, res) => {
  const channelId = req.params.channelId;
  const listOfPosts = await Posts.findAll({
    where: { ChannelId: channelId },
    include: [Likes],
  });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

/**
 * @route GET /api/posts/byId/:id
 * @desc Get a post by id
 */
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

/**
 * @route GET /api/posts/byuserId/:id
 * @desc Get all posts by user id
 */
router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
});

/**
 * @route POST /api/posts/:channelId
 * @desc Create a new post in a channel
 */
router.post("/:channelId", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  post.ChannelId = req.params.channelId; // Add the ChannelId to the post
  await Posts.create(post);
  res.json(post);
});

/**
 * @route PUT /api/posts/:postId
 * @desc Update a post's title
 */
router.put("/title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });
  res.json(newTitle);
});

/**
 * @route PUT /api/posts/:postId
 * @desc Update a post's text
 */
router.put("/postText", validateToken, async (req, res) => {
  const { newText, id } = req.body;
  await Posts.update({ postText: newText }, { where: { id: id } });
  res.json(newText);
});

/**
 * @route DELETE /api/posts/:postId
 * @desc Delete a post by id
 */
router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
