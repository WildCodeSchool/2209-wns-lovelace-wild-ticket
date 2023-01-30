import { hashSync } from "bcryptjs";
import {
  clearAllRepositories,
  closeConnection,
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
    clearAllRepositories();
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
      const emailAddress = "jean@user.com";
      it("deletes session in database", async () => {
        await AppUserRepository.createUser(
          "Jean",
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
          "Jean",
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
