const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");

const app = express();
const logDirectory = path.resolve(path.join(__dirname, "..", "logs"));

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = rfs.createStream("access.log", {
  size: "10M",
  interval: "1d", // rotate daily
  path: logDirectory,
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

// log only 4xx and 5xx responses to console
app.use(
  morgan("dev", {
    skip: (_, res) => res.statusCode < 400,
  })
);

// log all requests to access.log
app.use(morgan("common", { stream: accessLogStream }));

module.exports = app;
