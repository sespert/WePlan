const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
    .get(userController.findAll)
    .post(userController.create)
    .put(userController.update);

router.route("/verify")
    .get(userController.find);

router.route("/signin")
    .get(userController.findAll)
    .post(userController.signin);

router.route("/findsession/:sessionToken")
    .get(userController.findSession);

router.route("/logout")
    .get(userController.logout);

router.route("/:id")
    .get(userController.findById);


router.route("/:email")
    .get(userController.find);

router.route("/conf")
    .put(userController.updateAndDelete);   

module.exports = router;
