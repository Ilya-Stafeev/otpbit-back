import express, { Request, Response, NextFunction } from 'express';
import Knex from "knex";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import { expressjwt } from 'express-jwt';
import yaml from "yamljs";
import path from "path";

import knexConfig from "./db/knexfile";
import userRoutes from "./routes/userRoutes";

// Загрузка переменных окружения
dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API for managing users",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const app = express();

app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware для обработки JWT
app.use(
  expressjwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ['HS256'],
  }).unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] },
      { url: /\/api-docs/, methods: ['GET'] }
    ],
  })
);

// Маршруты
app.use("/api", userRoutes);

// Middleware для обработки ошибок
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});


// Middleware для обработки несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

async function runMigrations() {
  const knex = Knex(knexConfig.development);

  try {
    await knex.migrate.latest();
    console.log("Migrations applied successfully.");
  } catch (error) {
    console.error("Error applying migrations:", error);
    process.exit(1);
  } finally {
    await knex.destroy();
  }
}

runMigrations().then(() => {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
