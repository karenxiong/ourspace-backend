const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collectionController");

router.route("/").get(collectionController.getAllCollections);

router
  .route("/:id")
  .get(collectionController.getCollectionId)
  .post(collectionController.newCollection)
  .put(collectionController.updateCollection)
  .delete(collectionController.deleteCollection);

module.exports = router;
