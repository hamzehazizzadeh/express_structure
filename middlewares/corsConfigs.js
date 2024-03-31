const cors = require("cors");

exports.corsConfigs = cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "authorization",
    "X-Authorization",
  ],
});
