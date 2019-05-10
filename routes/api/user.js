const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
    .get(userController.findAll)
    .post(userController.create);

router.route("/user")
    .get(userController.findAll)
    .post(userController.create);

router.route("/:id")
    .get(userController.findById);

router.route("/:email")
    .get(userController.find);

module.exports = router;
