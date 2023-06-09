const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

/**
 * @route GET /api/comments/:postId
 * @desc Get all comments for a post
 */
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

/**
 * @route POST /api/comments
 * @desc Create a new comment
 */
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;

  // If parentId is provided, add the comment as a reply to the parent comment
  if (comment.parentId) {
    const parentComment = await Comments.findByPk(comment.parentId);
    if (!parentComment) {
      return res.status(404).json({ message: "Parent comment not found." });
    }
    await parentComment.createComment(comment);
    return res.json(comment);
  }

  // If parentId is not provided, add the comment as a new comment
  await Comments.create(comment);
  res.json(comment);
});

/**
 * @route DELETE /api/comments/:commentId
 * @desc Delete a comment by id
 */
router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
