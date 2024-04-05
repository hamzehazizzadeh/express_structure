const express = require("express");

const { userRoleItems } = require("../utils/enum");
const { authenticated } = require("../middlewares/authorization");

const app = express();

//* Routes
app.use("/auth", require("./authRoutes/authRoutes"));
app.use(
  "/admin",
  authenticated([userRoleItems[0]]),
  require("./adminRoutes/adminRoutes")
);
app.use(
  "/buyer",
  authenticated([userRoleItems[1]]),
  require("./buyerRoutes/buyerRoutes")
);
app.use(
  "/user",
  authenticated(userRoleItems),
  require("./userRoutes/userRoutes")
);
app.use("/", require("./publicRoutes/publicRoutes"));

module.exports = app;
