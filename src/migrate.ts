import Knex from "knex";
import knexConfig from "./db/knexfile";

async function runMigrations() {
  const knex = Knex(knexConfig.development);

  try {
    await knex.migrate.latest();
    console.log("Migrations applied successfully.");
  } catch (error) {
    console.error("Error applying migrations:", error);
  } finally {
    await knex.destroy();
  }
}

runMigrations();
