const express = require("express");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const routes = require("./routes");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

// MiddleWares

// refactored to use helmet set security-related HTTP response headers
app.use(helmet());
// Will replace prohibited characters with _,
app.use(mongoSanitize({ replaceWith: "_" }));
// support parsing of application/json type post data and limit payload
app.use(express.json({ limit: "300kb" }));
//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/weplanDB");
mongoose.connection.once('open', function () {
  console.log('connection has been made, now make some fireworks...');
  // done();
}).on('error', function (error) {
  console.log('connection error:', error);
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
