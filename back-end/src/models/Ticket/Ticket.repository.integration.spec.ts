import { clearAllRepositories, closeConnection, initializeDatabaseRepositories } from "../../database/utils"

describe("TicketRepository integration", () => {
  beforeAll(async () => {
    await initializeDatabaseRepositories();
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(async () => {
    clearAllRepositories();
  });

});