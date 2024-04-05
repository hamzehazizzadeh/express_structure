const Base = require("../Objection/Objection.model");

class SeedLog extends Base {
  static get tableName() {
    return "SeedLog";
  }
  static get idColumn() {
    return "id";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "number" },
        seedsAlreadyInserted: { type: "boolean" },
      },
    };
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = SeedLog;
