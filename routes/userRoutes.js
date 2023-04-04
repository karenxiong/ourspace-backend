const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUserId)
  .post(userController.newUser)
  .put(userController.updateUser);
// .delete(userController.deleteUser);

module.exports = router;
