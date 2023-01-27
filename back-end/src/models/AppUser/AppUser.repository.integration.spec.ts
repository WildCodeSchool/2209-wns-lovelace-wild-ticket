import { hashSync } from "bcryptjs";
import {
  clearAllRepositories,
  closeConnection,
  getDatabase,
  initializeDatabaseRepositories,
} from "../../database/utils";
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
    // eslint-disable-next-line no-restricted-syntax
    const database = await getDatabase();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      clearAllRepositories();
    }
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
              "Jean",
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
              "Jean",
              emailAddress,
              hashSync("mot-de-passe-de-jean"),
              "ROLE_ADMIN",
              [],
              ""
            );

            console.log(await AppUserRepository.getUsers());

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
              "Jean",
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
      it("deletes session in database", () => {});
      it("returns user", () => {});
    });
  });
});
