import {
  clearAllRepositories,
  closeConnection,
  initializeDatabaseRepositories,
} from "../../database/utils";
import DateUpdates from "../../services/DateUpdates";
import PoleRepository from "../Pole/Pole.repository";
import RestaurantRepository from "../Restaurant/Restaurant.repository";

describe("RestaurantRepository integration", () => {
  beforeAll(async () => {
    await initializeDatabaseRepositories();
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(async () => {
    await clearAllRepositories();
  });

  describe("createRestaurant", () => {
    describe("when a pole doesn't exists", () => {
      it("returns invalid pole error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          RestaurantRepository.createRestaurant(
            "restaurant",
            undefined,
            5,
            2,
            falseUuid
          )
        ).rejects.toThrowError("Aucun pôle ne correspond à cet ID.");
      });
    });
    describe("when a pole exists", () => {
      it("returns the created restaurant", async () => {
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

        expect(restaurant.name).toBe("restaurant");
      });
    });
  });

  describe("updateRestaurant", () => {
    describe("when a restaurant doesn't exists", () => {
      it("returns invalid restaurant error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          RestaurantRepository.updateRestaurant(
            falseUuid,
            "restaurant",
            undefined,
            5,
            2
          )
        ).rejects.toThrowError("Aucun restaurant ne correspond à cet ID.");
      });
    });
    describe("when a restaurant exists", () => {
      it("returns the updated restaurant", async () => {
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

        const updatedRestaurant = await RestaurantRepository.updateRestaurant(
          restaurant.id,
          "newRestaurant",
          undefined,
          5,
          2
        );

        expect(updatedRestaurant.name).toBe("newRestaurant");
      });
    });
  });

  describe("deleteRestaurant", () => {
    describe("when a restaurant doesn't exists", () => {
      it("returns invalid restaurant error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          RestaurantRepository.updateRestaurant(
            falseUuid,
            "restaurant",
            undefined,
            5,
            2
          )
        ).rejects.toThrowError("Aucun restaurant ne correspond à cet ID.");
      });
    });
    describe("when a restaurant exists", () => {
      it("expects restaurant is null in database", async () => {
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

        await RestaurantRepository.deleteRestaurant(restaurant.id);

        const restaurantById = await RestaurantRepository.getRestaurantById(
          restaurant.id
        );

        expect(restaurantById).toBe(null);
      });
    });
  });

  describe("updateRestaurantOpeningTime", () => {
    describe("when a restaurant doesn't exists", () => {
      it("returns invalid restaurant error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          RestaurantRepository.updateRestaurant(
            falseUuid,
            "restaurant",
            undefined,
            5,
            2
          )
        ).rejects.toThrowError("Aucun restaurant ne correspond à cet ID.");
      });
    });
    describe("when a restaurant exists", () => {
      it("returns the new opening times of the restaurant", async () => {
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

        const updatedOpeningTime =
          await RestaurantRepository.updateRestaurantOpeningTime(
            restaurant.id,
            10,
            0,
            22,
            0
          );

        const newOpeningTime = DateUpdates.updateOpenedClosedHoursRestaurant(
          10,
          0
        );
        const newClosingTime = DateUpdates.updateOpenedClosedHoursRestaurant(
          22,
          0
        );

        expect(updatedOpeningTime.openAt).toEqual(newOpeningTime);
        expect(updatedOpeningTime.closeAt).toEqual(newClosingTime);
      });
    });
  });
});
