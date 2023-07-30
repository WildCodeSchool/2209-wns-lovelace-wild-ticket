import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { ExpressContext } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import {
  initializeDatabaseRepositories,
  clearAllRepositories,
} from "./database/utils";

import AppUserResolver from "./resolvers/AppUser/AppUser.resolver";
import AppUserRepository from "./models/AppUser/AppUser.repository";
import PoleRepository from "./models/Pole/Pole.repository";
import RestaurantRepository from "./models/Restaurant/Restaurant.repository";
import { getSessionIdInCookie } from "./http-utils";
import AppUser from "./models/AppUser/AppUser.entity";
import TableRepository from "./models/Table/Table.repository";
import TicketRepository from "./models/Ticket/Ticket.repository";
import TableResolver from "./resolvers/Table/Table.resolver";
import TicketResolver from "./resolvers/Ticket/Ticket.resolver";
import PoleResolver from "./resolvers/Pole/Pole.resolver";
import RestaurantResolver from "./resolvers/Restaurant/Restaurant.resolver";
import StatsResolver from "./resolvers/Stats/Stats.resolver";
import { AppUserFixtures } from "./DataFixtures/AppUserFixtures";
import { TableFixtures } from "./DataFixtures/TableFixtures";
import { IS_PRODUCTION } from "./config";

export type GlobalContext = ExpressContext & {
  user: AppUser | null;
};

const authenticationChecker = async (
  { context }: any,
  roles: string[]
): Promise<boolean> => {
  // Vérifier si l'environnement est Apollo Sandbox
  const isApolloSandbox =
    !IS_PRODUCTION &&
    context.req.headers["apollographql-client-name"] === "apollo-sandbox";

  // Autoriser automatiquement l'accès si c'est Apollo Sandbox
  if (isApolloSandbox) {
    return true;
  }

  // Sinon, procéder à l'authentification normale
  return roles.length === 0
    ? Boolean(context.user)
    : Boolean(roles.includes(context.user.role));
};

const getUserContext = async (context: any) => {
  const sessionId = getSessionIdInCookie(context);
  const user = !sessionId
    ? null
    : await AppUserRepository.getUserBySessionId(sessionId);

  return { res: context.res, req: context.req, user };
};

const startServer = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AppUserResolver,
        TableResolver,
        TicketResolver,
        PoleResolver,
        RestaurantResolver,
        StatsResolver,
      ],
      authChecker: authenticationChecker,
    }),
    context: getUserContext,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  // The `listen` method launches a web server.
  const { url } = await server.listen();
  await initializeDatabaseRepositories();
  console.log("🚀  Database init : OK  🚀");

  await clearAllRepositories();
  console.log("🚀  Data truncate : OK  🚀");

  await PoleRepository.initializePoles();
  await RestaurantRepository.initializeRestaurants();
  await AppUserRepository.initializeAppUsers(AppUserFixtures);
  await TableRepository.initializeTables(TableFixtures);
  await TicketRepository.initializeTickets();
  console.log("🚀  Data init : OK  🚀");

  console.log(`🚀  Server ready at ${url}  🚀`);
};

startServer();
