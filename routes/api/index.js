const router = require("express").Router();
const eventRoutes = require("./events");
const userRoutes = require("./user");

// Event routes
router.use("/events", eventRoutes);
router.use("/user", userRoutes);

module.exports = router;
