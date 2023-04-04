const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.route("/").get(postController.getAllPosts);

router
  .route("/:id")
  .get(postController.getPostId)
  .post(postController.newPost)
  .put(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
