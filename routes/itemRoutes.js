const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const multer = require("multer");
const upload = multer();
const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "http://localhost:8080/",
  issuerBaseURL: `https://dev-ezihsb7v3ye3h2nz.us.auth0.com/`,
});

router
  .route("/")
  .get(itemController.getAllItems)
  .post(checkJwt, upload.none(), itemController.newItem);

router
  .route("/:id")
  .get(itemController.getItemId)
  .put(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
