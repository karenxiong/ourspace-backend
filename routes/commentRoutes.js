const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.route("/").get(commentController.getAllComments);

router
  .route("/:id")
  .get(commentController.getCommentId)
  .post(commentController.newComment)
  .put(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
