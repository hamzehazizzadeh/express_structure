const path = require("path");

const express = require("express");
const dotEnv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");

const { errorHandler } = require("./middlewares/errors");
const { authenticated } = require("./middlewares/authorization");
const { swaggerOptions } = require("./utils");

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
});

//* BodyPaser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//* File Upload Middleware
app.use(fileUpload());

//* Routes
app.use("/auth", require("./routes/authRoutes/authRoutes"));

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
