const path = require("path");

const express = require("express");
const dotEnv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const mongoose = require("mongoose");

const mongoSeeds = require("./utils/seed/mongoSeeds");
const logger = require("./middlewares/logger");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/errors");
const { swaggerOptions } = require("./utils");
const { corsConfigs } = require("./middlewares/corsConfigs");

const app = express();

//* Load Config
dotEnv.config({ path: "./config.env" });

//* Database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");

  //* Mongo Seeds
  mongoSeeds();
});

//* BodyPaser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//* CORS
app.use(corsConfigs);

//* Logs
app.use(logger);

//* Routes
app.use(routes);

//* Static Folder
app.use("/public", express.static(path.join(__dirname, "public")));

//* Error Controller
app.use(errorHandler);

//* Swagger Config
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(
  "/swagger",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs, { explorer: true })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
