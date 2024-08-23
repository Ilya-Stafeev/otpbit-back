import { Knex } from "knex";
import path from "path";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5433,
      user: 'postgres',
      password: 'root',
      database: 'otpbit'
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, "migrations"),
      extension: "ts",
    }
  },
};

export default config;