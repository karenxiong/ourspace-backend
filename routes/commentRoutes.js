const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router
  .route("/")
  .get(commentController.getAllComments)
  .post(commentController.newComment);

router
  .route("/:id")
  .get(commentController.getCommentId)

  .put(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
