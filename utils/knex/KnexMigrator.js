const knex = require("knex");

const SeedLog = require("../../models/model/SeedLog/SeedLog.model");
const knexConfigs = require("../../knexfile");

const knexClient = knex(knexConfigs);

class KnexMigrator {
  static async insertSeedRecordsIfNotExists() {
    const previousSeedLog = await SeedLog.query()
      .where({ seedsAlreadyInserted: true })
      .limit(1)
      .first();
    if (!previousSeedLog) {
      await knexClient.seed.run();
      await SeedLog.query().insert({
        seedsAlreadyInserted: true,
      });
    }
  }

  static async migrateLatest() {
    await knexClient.migrate.latest();
    if (process.env.SEED_ENABLED === "true")
      await DBMigrator.insertSeedRecordsIfNotExists();
  }
}

module.exports = KnexMigrator;
