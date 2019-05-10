const router = require("express").Router();
const eventRoutes = require("./events");
const userRoutes = require("./user");
const conferenceRoutes = require("./conferences");

// Event routes
router.use("/events", eventRoutes);
router.use("/user", userRoutes);
router.use("/conferences", conferenceRoutes);

module.exports = router;

