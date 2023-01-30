import {
  clearAllRepositories,
  closeConnection,
  initializeDatabaseRepositories,
} from "../../database/utils";
import PoleRepository from "../Pole/Pole.repository";

describe("PoleRepository integration", () => {
  beforeAll(async () => {
    await initializeDatabaseRepositories();
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(async () => {
    await clearAllRepositories();
  });

  describe("createPole", () => {
    describe("when a pole is correctly created", () => {
      it("returns existing pole", async () => {
        const pole = await PoleRepository.createPole(
          "Pôle de Lyon",
          "rue de la Poste",
          "69002",
          "Lyon",
          "polelyon@polelyon.fr"
        );

        expect(pole.name).toEqual("Pôle de Lyon");
      });
    });
  });

  describe("updatePole", () => {
    describe("when a pole doesn't exists", () => {
      it("returns invalid pole error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          PoleRepository.updatePole(
            falseUuid,
            "Pôle de Paris",
            "rue de la Poste",
            "69002",
            "Lyon",
            "polelyon@polelyon.fr"
          )
        ).rejects.toThrowError("Aucun pôle ne correspond à cet ID.");
      });
    });
    describe("when a pole exists", () => {
      it("returns the updated pole", async () => {
        const pole = await PoleRepository.createPole(
          "Pôle de Lyon",
          "rue de la Poste",
          "69002",
          "Lyon",
          "polelyon@polelyon.fr"
        );

        const updatedPole = await PoleRepository.updatePole(
          pole.id,
          "Pôle de Paris",
          "rue de la Poste",
          "69002",
          "Lyon",
          "polelyon@polelyon.fr"
        );

        expect(updatedPole.id).toBe(pole.id);
        expect(updatedPole.name).toBe("Pôle de Paris");
      });
    });
  });

  describe("deletePole", () => {
    describe("when a pole doesn't exists", () => {
      it("returns invalid pole error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          PoleRepository.updatePole(
            falseUuid,
            "Pôle de Paris",
            "rue de la Poste",
            "69002",
            "Lyon",
            "polelyon@polelyon.fr"
          )
        ).rejects.toThrowError("Aucun pôle ne correspond à cet ID.");
      });
    });
    describe("when a pole exists", () => {
      it("expects restaurant is null in database", async () => {
        const pole = await PoleRepository.createPole(
          "Pôle de Lyon",
          "rue de la Poste",
          "69002",
          "Lyon",
          "polelyon@polelyon.fr"
        );

        await PoleRepository.deletePole(pole.id);

        const poleById = await PoleRepository.getPoleById(pole.id);

        expect(poleById).toBe(null);
      });
    });
  });
});
