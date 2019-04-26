const router = require("express").Router();
const conventionController = require("../../controllers/conventionController");

// Matches with "/api/convention"
router.route("/")
  .get(conventionController.findAll)
  .post(conventionController.create);

// Matches with "/api/convention/:id"
router
  .route("/:id")
  .get(conventionController.findById)
  .put(conventionController.update)
  .delete(conventionController.remove);

module.exports = router;
