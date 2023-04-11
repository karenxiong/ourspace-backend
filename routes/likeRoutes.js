const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const multer = require("multer");
const upload = multer();
const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "http://localhost:8080/",
  issuerBaseURL: `https://dev-ezihsb7v3ye3h2nz.us.auth0.com/`,
});

router
  .route("/")
  .get(likeController.getAllLikes)
  .post(checkJwt, upload.none(), likeController.newLike);

router
  .route("/:id")
  .get(likeController.getLikeId)
  .delete(likeController.deleteLike);

module.exports = router;
