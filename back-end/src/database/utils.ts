import { DataSource, EntityTarget } from "typeorm";
import { DATABASE_URL, NODE_ENV, TEST_DATABASE_URL } from "../config";
import AppUserRepository from "../models/AppUser/AppUser.repository";
import SessionRepository from "../models/AppUser/Session.repository";
import PoleRepository from "../models/Pole/Pole.repository";
import RestaurantRepository from "../models/Restaurant/Restaurant.repository";
import TableRepository from "../models/Table/Table.repository";
import TicketRepository from "../models/Ticket/Ticket.repository";

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
  await SessionRepository.initializeRepository();
  await TicketRepository.initializeRepository();
  await TableRepository.initializeRepository();
  await AppUserRepository.initializeRepository();
  await RestaurantRepository.initializeRepository();
  await PoleRepository.initializeRepository();
}

async function clearAllRepositories() {
  await SessionRepository.clearRepository();
  await TicketRepository.clearRepository();
  await TableRepository.clearRepository();
  await AppUserRepository.clearRepository();
  await RestaurantRepository.clearRepository();
  await PoleRepository.clearRepository();
}

async function closeConnection() {
  await dataSource.destroy();
}

export {
  getDatabase,
  getRepository,
  initializeDatabaseRepositories,
  clearAllRepositories,
  closeConnection,
};
