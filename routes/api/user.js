const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
    .get(userController.findAll)
    .post(userController.create);

// router.route("/user")
//     .get(userController.findAll)
//     .post(userController.create);

router.route("/verify")
    .get(userController.find);

router.route("/signin")
    .get(userController.findAll)
    .post(userController.signin);

router.route("/logout")
    .get(userController.logout);

router.route("/:id")
    .get(userController.findById);

router.route("/:email")
    .get(userController.find);





module.exports = router;
