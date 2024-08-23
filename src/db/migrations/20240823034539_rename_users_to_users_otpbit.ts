import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users_otpbit", (table) => {
    table.uuid("id").primary();
    table.string("name", 100).notNullable();
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users_otpbit");
}