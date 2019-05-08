const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/event"
router.route("/register")
  .post(userController.create);

// Matches with "/api/convention/:id"
// router
//   .route("/:id")
//   .get(eventController.findById)
//   .put(eventController.update)
//   .delete(eventController.remove);

module.exports = router;
