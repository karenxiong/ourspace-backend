const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { auth } = require("express-oauth2-jwt-bearer");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, `../${postController.UPLOAD_PATH}`));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const checkJwt = auth({
  audience: "http://localhost:8080/",
  issuerBaseURL: `https://dev-ezihsb7v3ye3h2nz.us.auth0.com/`,
});

router
  .route("/user/:id/:current_logged_in_user_id")
  .get(postController.getAllPosts);
router.route("/user/:id").get(postController.getAllPosts);
router.route("/user/").get(postController.getAllPosts);

router
  .route("/")
  .post(checkJwt, upload.single("uploaded_file"), postController.newPost);

router
  .route("/:id")
  .get(postController.getPostId)
  .put(checkJwt, postController.updatePost)
  .delete(checkJwt, postController.deletePost);

router.route("/:id/markers").get(postController.getMarkers);

module.exports = router;
