const Knex = require("knex");
const { Model } = require("objection");

const knexConfigs = require("../../../knexfile");

const knex = Knex(knexConfigs);
Model.knex(knex);

class Base extends Model {
  $beforeInsert() {
    this["created_at"] = new Date().toISOString();
    this["updated_at"] = new Date().toISOString();
  }

  $beforeUpdate() {
    this["updated_at"] = new Date().toISOString();
  }
}

module.exports = Base;
