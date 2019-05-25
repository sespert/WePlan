const router = require("express").Router();
const conferenceController = require("../../controllers/conferenceController");

router.route("/")
    .get(conferenceController.findAll)
    .post(conferenceController.create);

router.route("/:id")
  .get(conferenceController.findById)
  .delete(conferenceController.remove);

module.exports = router;
