/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\nmutation CreateTicket($name: String!, $seats: Float!, $restaurant: String!, $email: String, $phoneNumber: String) {\n  createTicket(name: $name, seats: $seats, restaurant: $restaurant, email: $email, phoneNumber: $phoneNumber) {\n    id\n    number\n    seats\n    createdAt\n  }\n}\n": types.CreateTicketDocument,
    "\n  query GetRestaurants {\n    getRestaurants {\n      id\n      name\n    }\n  }\n": types.GetRestaurantsDocument,
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
export function graphql(source: "\nmutation CreateTicket($name: String!, $seats: Float!, $restaurant: String!, $email: String, $phoneNumber: String) {\n  createTicket(name: $name, seats: $seats, restaurant: $restaurant, email: $email, phoneNumber: $phoneNumber) {\n    id\n    number\n    seats\n    createdAt\n  }\n}\n"): (typeof documents)["\nmutation CreateTicket($name: String!, $seats: Float!, $restaurant: String!, $email: String, $phoneNumber: String) {\n  createTicket(name: $name, seats: $seats, restaurant: $restaurant, email: $email, phoneNumber: $phoneNumber) {\n    id\n    number\n    seats\n    createdAt\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRestaurants {\n    getRestaurants {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetRestaurants {\n    getRestaurants {\n      id\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;