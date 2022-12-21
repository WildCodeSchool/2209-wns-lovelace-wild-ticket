import { DataSource, EntityTarget } from "typeorm";
import { DATABASE_URL, NODE_ENV, TEST_DATABASE_URL } from "../config";
import AppUserRepository from "../models/AppUser/AppUser.repository";
import SessionRepository from "../models/AppUser/Session.repository";

const dataSource = new DataSource({
  type: "postgres",
  url: NODE_ENV === "test" ? TEST_DATABASE_URL : DATABASE_URL,
  synchronize: true,
  entities: [
    __dirname + `/../models/**/*.entity.${NODE_ENV === "test" ? "ts" : "js"}`,
  ],
  logging: NODE_ENV === "development" ? ["query", "error"] : ["error"],
});

let initialized = false;
async function getDatabase() {
  if (!initialized) {
    await dataSource.initialize();
    initialized = true;
    console.log("Successfully connected to database.");
  }
  return dataSource;
}

async function getRepository(entity: EntityTarget<any>) {
  return (await getDatabase()).getRepository(entity);
}

async function initializeDatabaseRepositories() {
  await AppUserRepository.initializeRepository();
  await SessionRepository.initializeRepository();
}

async function closeConnection() {
  await dataSource.destroy();
}

export {
  getDatabase,
  getRepository,
  initializeDatabaseRepositories,
  closeConnection,
};
