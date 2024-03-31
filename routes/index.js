const express = require("express");

const app = express();

//* Routes
app.use("/auth", require("./authRoutes/authRoutes"));

module.exports = app;
