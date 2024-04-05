const path = require("path");

const knexConfigs = {
  client: "postgresql",
  connection: {
    user: "postgres",
    password: "admin",
    database: "ecommerce",
  },
  migrations: {
    directory: path.join(__dirname, "db", "migrations"),
  },
  seeds: {
    directory: path.join(__dirname, "db", "seeds"),
  },
};

module.exports = knexConfigs;
