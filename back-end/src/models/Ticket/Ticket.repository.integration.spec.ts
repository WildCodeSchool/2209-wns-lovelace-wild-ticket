import {
  clearAllRepositories,
  closeConnection,
  initializeDatabaseRepositories,
} from "../../database/utils";
import DateUpdates from "../../services/DateUpdates";
import PoleRepository from "../Pole/Pole.repository";
import RestaurantRepository from "../Restaurant/Restaurant.repository";
import TableRepository from "../Table/Table.repository";
import TicketRepository from "./Ticket.repository";

describe("TicketRepository integration", () => {
  beforeAll(async () => {
    await initializeDatabaseRepositories();
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(async () => {
    await clearAllRepositories();
  });

  describe("createTicket", () => {
    describe("when a restaurant doesn't exists", () => {
      it("returns invalid restaurant error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          TicketRepository.createTicket(
            "Michel",
            2,
            falseUuid,
            "test@test.fr",
            "0601020304"
          )
        ).rejects.toThrowError("Aucun restaurant ne correspond à cet ID.");
      });
      describe("when a restaurant exixsts", () => {
        describe("when a user submits any email AND phone number", () => {
          it("throws email or phone number mandatory error", async () => {
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
              pole.id
            );

            return expect(() =>
              TicketRepository.createTicket("Michel", 2, restaurant.id, "", "")
            ).rejects.toThrowError(
              "Une adresse e-mail ou un numéro de téléphone mobile est obligatoire."
            );
          });
        });
        describe("when a user submits an email or a phone number", () => {
          it("returns ticket number 1", async () => {
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
              pole.id
            );

            const ticket = await TicketRepository.createTicket(
              "Michel",
              2,
              restaurant.id,
              "test@test.fr",
              "0601020304"
            );

            expect(ticket.number).toEqual("R-230508-001");
          });
        });
      });
    });
  });

  describe("UpdageDeliveredAt", () => {
    describe("when a ticket doesn't exists", () => {
      it("returns no matching Id error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

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
          pole.id
        );

        const table = await TableRepository.createTable(1, 2, restaurant.id);

        return expect(() =>
          TicketRepository.updateDeliveredAt(falseUuid, table.id)
        ).rejects.toThrowError("Aucun ticket ne correspond à cet ID.");
      });
    });
    describe("when a table doesn't exists", () => {
      it("returns no matching Id error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

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
          pole.id
        );

        const ticket = await TicketRepository.createTicket(
          "Michel",
          2,
          restaurant.id,
          "test@test.fr",
          "0601020304"
        );

        return expect(() =>
          TicketRepository.updateDeliveredAt(ticket.id, falseUuid)
        ).rejects.toThrowError("Aucune table ne correspond à cet ID.");
      });
    });
    describe("when a restaurant and a ticket extists", () => {
      it("a closedAt must be present at t + 15mn", async () => {
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
          pole.id
        );

        const table = await TableRepository.createTable(1, 2, restaurant.id);

        const ticket = await TicketRepository.createTicket(
          "Michel",
          2,
          restaurant.id,
          "test@test.fr",
          "0601020304"
        );

        const deliveredTicket = await TicketRepository.updateDeliveredAt(
          ticket.id,
          table.id
        );

        const closedAt = DateUpdates.addMinutesToDate(
          deliveredTicket.deliveredAt as Date,
          15
        );

        expect(deliveredTicket.closedAt).toEqual(closedAt);
      });
    });
  });

  describe("updatePlacedAt", () => {
    describe("when a ticket doesn't exists", () => {
      it("returns no matching Id error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          TicketRepository.updatePlacedAt(falseUuid)
        ).rejects.toThrowError("Aucun ticket ne correspond à cet ID.");
      });
    });
    describe("when a ticket exists", () => {
      it("a closedAt must be present at t + 240mn", async () => {
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
          pole.id
        );

        const table = await TableRepository.createTable(1, 2, restaurant.id);

        const ticket = await TicketRepository.createTicket(
          "Michel",
          2,
          restaurant.id,
          "test@test.fr",
          "0601020304"
        );

        const deliveredTicket = await TicketRepository.updateDeliveredAt(
          ticket.id,
          table.id
        );

        const updatedPlacedAtTicket = await TicketRepository.updatePlacedAt(
          deliveredTicket.id
        );

        const closedAt = DateUpdates.addMinutesToDate(
          updatedPlacedAtTicket.placedAt as Date,
          240
        );

        expect(updatedPlacedAtTicket.closedAt).toEqual(closedAt);
      });
    });
  });

  describe("updateClosedAt", () => {
    describe("when a ticket doesn't exists", () => {
      it("returns no matching Id error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          TicketRepository.updatePlacedAt(falseUuid)
        ).rejects.toThrowError("Aucun ticket ne correspond à cet ID.");
      });
    });
    describe("when a ticket exists", () => {
      it("a closedAt must be present at t now", async () => {
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
          pole.id
        );

        const table = await TableRepository.createTable(1, 2, restaurant.id);

        const ticket = await TicketRepository.createTicket(
          "Michel",
          2,
          restaurant.id,
          "test@test.fr",
          "0601020304"
        );

        const deliveredTicket = await TicketRepository.updateDeliveredAt(
          ticket.id,
          table.id
        );

        const updatedPlacedAtTicket = await TicketRepository.updatePlacedAt(
          deliveredTicket.id
        );

        const closedAt = DateUpdates.addMinutesToDate(
          updatedPlacedAtTicket.placedAt as Date,
          240
        );

        expect(updatedPlacedAtTicket.closedAt).toEqual(closedAt);
      });
    });
  });
});
