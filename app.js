const path = require("path");
const http = require("http");

const express = require("express");
const compression = require("compression");
const dotEnv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const mongoose = require("mongoose");

const routes = require("./routes");
const logger = require("./middlewares/logger");
const KnexMigrator = require("./utils/knex/KnexMigrator");
const { errorHandler } = require("./middlewares/errors");
const { swaggerOptions } = require("./utils");
const { corsConfigs } = require("./middlewares/corsConfigs");

const app = express();

//* Load Config
dotEnv.config({ path: "./config.env" });

//* Database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

//* BodyPaser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* CORS
app.use(corsConfigs);

//* Logs
app.use(logger);

//* Compression
app.use(compression());

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

//* Migrate Latest
KnexMigrator.migrateLatest();

//* Create HTTP server.
const server = http.createServer(app);

//* Listening for HTTP connections
const HTTP_PORT = process.env.HTTP_PORT || 4000;
server.listen(HTTP_PORT, () =>
  console.log(`HTTP Server running on port ${HTTP_PORT}`)
);
