const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "http://localhost:8080/",
  issuerBaseURL: `https://dev-ezihsb7v3ye3h2nz.us.auth0.com/`,
});

router
  .route("/")
  .get(postController.getAllPosts)
  .post(checkJwt, postController.newPost);

router
  .route("/:id")
  .get(postController.getPostId)
  .put(checkJwt, postController.updatePost)
  .delete(checkJwt, postController.deletePost);

module.exports = router;
