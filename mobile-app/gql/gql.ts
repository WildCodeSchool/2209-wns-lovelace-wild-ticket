/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  "\n  query Restaurants {\n    getRestaurants {\n      id\n      name\n      openAt\n      closeAt\n      picture\n    }\n  }\n":
    types.RestaurantsDocument,
  "\n  query GetPaginateRestaurantsByPole($pole: String!, $pageNumber: Float!) {\n    getPaginateRestaurantsByPole(pole: $pole, pageNumber: $pageNumber) {\n      restaurants {\n        id\n        name\n        openAt\n        closeAt\n        picture\n      }\n      nextPageNumber\n      totalCount\n    }\n  }\n":
    types.GetPaginateRestaurantsByPoleDocument,
  "\n  mutation CreateTicket(\n    $name: String!\n    $seats: Float!\n    $restaurant: String!\n    $email: String\n    $phoneNumber: String\n  ) {\n    createTicket(\n      name: $name\n      seats: $seats\n      restaurant: $restaurant\n      email: $email\n      phoneNumber: $phoneNumber\n    ) {\n      id\n      number\n      seats\n      createdAt\n    }\n  }\n":
    types.CreateTicketDocument,
  "\n  query TicketsByRestaurant($restaurantId: ID!, $seats: Float) {\n    TicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n":
    types.TicketsByRestaurantDocument,
  "\n  query TablesByRestaurant($restaurantId: ID!, $capacity: Float) {\n    TablesByRestaurant(restaurantId: $restaurantId, capacity: $capacity) {\n      id\n      number\n      capacity\n    }\n  }\n":
    types.TablesByRestaurantDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Restaurants {\n    getRestaurants {\n      id\n      name\n      openAt\n      closeAt\n      picture\n    }\n  }\n"
): (typeof documents)["\n  query Restaurants {\n    getRestaurants {\n      id\n      name\n      openAt\n      closeAt\n      picture\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetPaginateRestaurantsByPole($pole: String!, $pageNumber: Float!) {\n    getPaginateRestaurantsByPole(pole: $pole, pageNumber: $pageNumber) {\n      restaurants {\n        id\n        name\n        openAt\n        closeAt\n        picture\n      }\n      nextPageNumber\n      totalCount\n    }\n  }\n"
): (typeof documents)["\n  query GetPaginateRestaurantsByPole($pole: String!, $pageNumber: Float!) {\n    getPaginateRestaurantsByPole(pole: $pole, pageNumber: $pageNumber) {\n      restaurants {\n        id\n        name\n        openAt\n        closeAt\n        picture\n      }\n      nextPageNumber\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateTicket(\n    $name: String!\n    $seats: Float!\n    $restaurant: String!\n    $email: String\n    $phoneNumber: String\n  ) {\n    createTicket(\n      name: $name\n      seats: $seats\n      restaurant: $restaurant\n      email: $email\n      phoneNumber: $phoneNumber\n    ) {\n      id\n      number\n      seats\n      createdAt\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateTicket(\n    $name: String!\n    $seats: Float!\n    $restaurant: String!\n    $email: String\n    $phoneNumber: String\n  ) {\n    createTicket(\n      name: $name\n      seats: $seats\n      restaurant: $restaurant\n      email: $email\n      phoneNumber: $phoneNumber\n    ) {\n      id\n      number\n      seats\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query TicketsByRestaurant($restaurantId: ID!, $seats: Float) {\n    TicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n"
): (typeof documents)["\n  query TicketsByRestaurant($restaurantId: ID!, $seats: Float) {\n    TicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query TablesByRestaurant($restaurantId: ID!, $capacity: Float) {\n    TablesByRestaurant(restaurantId: $restaurantId, capacity: $capacity) {\n      id\n      number\n      capacity\n    }\n  }\n"
): (typeof documents)["\n  query TablesByRestaurant($restaurantId: ID!, $capacity: Float) {\n    TablesByRestaurant(restaurantId: $restaurantId, capacity: $capacity) {\n      id\n      number\n      capacity\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
