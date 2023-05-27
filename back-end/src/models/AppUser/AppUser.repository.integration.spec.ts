import { hashSync } from "bcryptjs";
import {
  clearAllRepositories,
  closeConnection,
  initializeDatabaseRepositories,
} from "../../database/utils";
import PoleRepository from "../Pole/Pole.repository";
import AppUserRepository, {
  INVALID_CREDENTIALS_ERROR_MESSAGE,
} from "./AppUser.repository";
import SessionRepository from "./Session.repository";

describe("AppUserRepository integration", () => {
  beforeAll(async () => {
    await initializeDatabaseRepositories();
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(async () => {
    await clearAllRepositories();
  });

  describe("updateAppUser", () => {
    describe("when a user doesn't exists", () => {
      it("returns invalid user error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          AppUserRepository.updateUser(
            falseUuid,
            "jean@user.com",
            "ROLE_ADMIN",
            [],
            ""
          )
        ).rejects.toThrowError("Aucun utilisateur ne correspond à cet ID.");
      });
    });
    describe("when a user exists", () => {
      it("returns the updated user", async () => {
        console.log("test");
        const pole = await PoleRepository.createPole(
          "Pôle de Lyon",
          "rue de la Poste",
          "69002",
          "Lyon",
          "polelyon@polelyon.fr"
        );

        const user = await AppUserRepository.createUser(
          "jean@user.com",
          hashSync("mot-de-passe-de-jean"),
          "ROLE_ADMIN",
          [],
          ""
        );

        console.log(user);

        const updatedUser = await AppUserRepository.updateUser(
          user.id,
          "jean@user.fr",
          "ROLE_ADMIN",
          [pole.id],
          ""
        );

        console.log(updatedUser);

        expect(updatedUser.id).toBe(user.id);
        expect(updatedUser.email).toBe("jean@user.fr");
      });
    });
  });

  describe("deleteUser", () => {
    describe("when a user doesn't exists", () => {
      it("returns invalid user error", async () => {
        let falseUuid = "c1b646ca-926b-4fdc-8571-1423d47c295d";

        return expect(() =>
          AppUserRepository.deleteUser(falseUuid)
        ).rejects.toThrowError("Aucun utilisateur ne correspond à cet ID.");
      });
    });
    describe("when a user exists", () => {
      it("expects user is null in database", async () => {
        const user = await AppUserRepository.createUser(
          "jean@user.com",
          hashSync("mot-de-passe-de-jean"),
          "ROLE_ADMIN",
          [],
          ""
        );

        await AppUserRepository.deleteUser(user.id);

        const userById = await PoleRepository.getPoleById(user.id);

        expect(userById).toBe(null);
      });
    });
  });

  describe("signIn", () => {
    describe("when email address does not belong to existing user", () => {
      it("throws invalid credentials error", async () => {
        const emailAddress = "unknown@user.com";
        expect(() =>
          AppUserRepository.signIn(emailAddress, "whatever")
        ).rejects.toThrowError(INVALID_CREDENTIALS_ERROR_MESSAGE);
      });

      describe("when email address belongs to existing user", () => {
        const emailAddress = "jean@user.com";

        describe("when password invalid", () => {
          it("throws invalid credentials error", async () => {
            await AppUserRepository.createUser(
              emailAddress,
              hashSync("mot-de-passe-de-jean"),
              "ROLE_ADMIN",
              [],
              ""
            );

            expect(() =>
              AppUserRepository.signIn(emailAddress, "mot-de-passe-incorrect")
            ).rejects.toThrowError(INVALID_CREDENTIALS_ERROR_MESSAGE);
          });
        });

        describe("when password valid", () => {
          it("creates session in database", async () => {
            await AppUserRepository.createUser(
              emailAddress,
              hashSync("mot-de-passe-de-jean"),
              "ROLE_ADMIN",
              [],
              ""
            );

            await AppUserRepository.signIn(
              emailAddress,
              "mot-de-passe-de-jean"
            );

            const sessions = await SessionRepository.repository.find();
            expect(sessions).toHaveLength(1);
            expect(sessions[0].user.email).toEqual(emailAddress);
          });

          it("returns user and session", async () => {
            await AppUserRepository.createUser(
              emailAddress,
              hashSync("mot-de-passe-de-jean"),
              "ROLE_ADMIN",
              [],
              ""
            );

            const result = await AppUserRepository.signIn(
              emailAddress,
              "mot-de-passe-de-jean"
            );
            expect(result).toHaveProperty("user");
            expect(result).toHaveProperty("session");
            expect(result.user.email).toEqual(emailAddress);
          });
        });
      });
    });
  });

  describe("signOut", () => {
    describe("when passed existing user", () => {
      const emailAddress = "jean@user.com";
      it("deletes session in database", async () => {
        await AppUserRepository.createUser(
          emailAddress,
          hashSync("mot-de-passe-de-jean"),
          "ROLE_ADMIN",
          [],
          ""
        );

        const signIn = await AppUserRepository.signIn(
          emailAddress,
          "mot-de-passe-de-jean"
        );

        const userId = signIn.user.id;

        const signOut = await AppUserRepository.signOut(userId);

        expect(signOut).not.toHaveProperty("session");
      });

      it("returns user", async () => {
        await AppUserRepository.createUser(
          emailAddress,
          hashSync("mot-de-passe-de-jean"),
          "ROLE_ADMIN",
          [],
          ""
        );

        const signIn = await AppUserRepository.signIn(
          emailAddress,
          "mot-de-passe-de-jean"
        );

        const userId = signIn.user.id;

        const signOut = await AppUserRepository.signOut(userId);

        expect(signOut.email).toEqual(emailAddress);
      });
    });
  });
});
