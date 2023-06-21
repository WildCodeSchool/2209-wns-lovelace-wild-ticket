import {
  clearAllRepositories,
  closeConnection,
  initializeDatabaseRepositories,
} from "../../database/utils";
import PoleRepository from "../Pole/Pole.repository";
import RestaurantRepository from "../Restaurant/Restaurant.repository";
import TableRepository from "./Table.repository";

describe("TableRepository integration", () => {
  beforeAll(async () => {
    await initializeDatabaseRepositories();
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(async () => {
    await clearAllRepositories();
  });

  describe("createTable", () => {
    describe("when a restaurant doesn't exists", () => {
      it("returns invalid restaurant error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          TableRepository.createTable(1, 2, falseUuid)
        ).rejects.toThrowError("Aucun restaurant ne correspond à cet ID.");
      });
    });
    describe("when a restaurant exists", () => {
      it("returns the created table", async () => {
        const pole = await PoleRepository.createPole(
          "Pôle de Lyon",
          "rue de la Poste",
          "69002",
          "Lyon",
          "polelyon@polelyon.fr"
        );

        const restaurant = await RestaurantRepository.createRestaurant(
          "restaurant",
          undefined,
          5,
          2,
          pole.id
        );

        const table = await TableRepository.createTable(1, 2, restaurant.id);

        expect(table).toHaveProperty("id");
      });
    });
  });

  describe("updateTable", () => {
    describe("when a table doesn't exists", () => {
      it("returns invalid restaurant error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          TableRepository.updateTable(falseUuid, 1, 2)
        ).rejects.toThrowError("Aucune table ne correspond à cet ID.");
      });
    });
    describe("when a table exists", () => {
      it("returns the updated table", async () => {
        const pole = await PoleRepository.createPole(
          "Pôle de Lyon",
          "rue de la Poste",
          "69002",
          "Lyon",
          "polelyon@polelyon.fr"
        );

        const restaurant = await RestaurantRepository.createRestaurant(
          "restaurant",
          undefined,
          5,
          2,
          pole.id
        );

        const table = await TableRepository.createTable(1, 2, restaurant.id);

        const updatedTable = await TableRepository.updateTable(table.id, 1, 3);

        expect(updatedTable.capacity).toEqual(3);
      });
    });
  });

  describe("deleteTable", () => {
    describe("when a table doesn't exists", () => {
      it("returns invalid restaurant error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          TableRepository.updateTable(falseUuid, 1, 2)
        ).rejects.toThrowError("Aucune table ne correspond à cet ID.");
      });
    });
    describe("when a ticket exists", () => {
      it("expects table is null in database", async () => {
        const pole = await PoleRepository.createPole(
          "Pôle de Lyon",
          "rue de la Poste",
          "69002",
          "Lyon",
          "polelyon@polelyon.fr"
        );

        const restaurant = await RestaurantRepository.createRestaurant(
          "restaurant",
          undefined,
          5,
          2,
          pole.id
        );

        const table = await TableRepository.createTable(1, 2, restaurant.id);

        await TableRepository.deleteTable(table.id);

        const tableById = await TableRepository.getTableById(table.id);

        expect(tableById).toBe(null);
      });
    });
  });
});
