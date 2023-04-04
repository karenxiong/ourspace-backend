const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.route("/").get(itemController.getAllItems).post(itemController.newItem);

router
  .route("/:id")
  .get(itemController.getItemId)
  .put(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
