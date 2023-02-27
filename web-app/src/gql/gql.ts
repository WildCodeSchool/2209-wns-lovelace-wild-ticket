/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation SignOut($signOutId: String!) {\n    signOut(id: $signOutId) {\n      id\n    }\n  }\n": types.SignOutDocument,
    "\n  query MyProfile {\n    myProfile {\n      id\n      email\n      role\n      poles {\n        id\n        name\n      }\n      restaurant {\n        id\n        name\n      }\n    }\n  }\n": types.MyProfileDocument,
    "\n  query TicketsByRestaurant($ticketsByRestaurantId: String!) {\n    TicketsByRestaurant(id: $ticketsByRestaurantId) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n": types.TicketsByRestaurantDocument,
    "\n  query TablesByRestaurant($tablesByRestaurantId: String!) {\n    TablesByRestaurant(id: $tablesByRestaurantId) {\n      id\n      number\n      capacity\n    }\n  }\n": types.TablesByRestaurantDocument,
    "\nmutation UpdateClosedAt($updateClosedAtId: String!) {\n  updateClosedAt(id: $updateClosedAtId) {\n    id\n    closedAt\n  }\n}\n": types.UpdateClosedAtDocument,
    "\n  mutation SignIn($email: String!, $password: String!, $rememberMe: Boolean!) {\n    signIn(email: $email, password: $password, rememberMe: $rememberMe) {\n      id\n      email\n    }\n  }\n": types.SignInDocument,
};

export function graphql(source: "\n  mutation SignOut($signOutId: String!) {\n    signOut(id: $signOutId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation SignOut($signOutId: String!) {\n    signOut(id: $signOutId) {\n      id\n    }\n  }\n"];
export function graphql(source: "\n  query MyProfile {\n    myProfile {\n      id\n      email\n      role\n      poles {\n        id\n        name\n      }\n      restaurant {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyProfile {\n    myProfile {\n      id\n      email\n      role\n      poles {\n        id\n        name\n      }\n      restaurant {\n        id\n        name\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query TicketsByRestaurant($ticketsByRestaurantId: String!) {\n    TicketsByRestaurant(id: $ticketsByRestaurantId) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  query TicketsByRestaurant($ticketsByRestaurantId: String!) {\n    TicketsByRestaurant(id: $ticketsByRestaurantId) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query TablesByRestaurant($tablesByRestaurantId: String!) {\n    TablesByRestaurant(id: $tablesByRestaurantId) {\n      id\n      number\n      capacity\n    }\n  }\n"): (typeof documents)["\n  query TablesByRestaurant($tablesByRestaurantId: String!) {\n    TablesByRestaurant(id: $tablesByRestaurantId) {\n      id\n      number\n      capacity\n    }\n  }\n"];
export function graphql(source: "\nmutation UpdateClosedAt($updateClosedAtId: String!) {\n  updateClosedAt(id: $updateClosedAtId) {\n    id\n    closedAt\n  }\n}\n"): (typeof documents)["\nmutation UpdateClosedAt($updateClosedAtId: String!) {\n  updateClosedAt(id: $updateClosedAtId) {\n    id\n    closedAt\n  }\n}\n"];
export function graphql(source: "\n  mutation SignIn($email: String!, $password: String!, $rememberMe: Boolean!) {\n    signIn(email: $email, password: $password, rememberMe: $rememberMe) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($email: String!, $password: String!, $rememberMe: Boolean!) {\n    signIn(email: $email, password: $password, rememberMe: $rememberMe) {\n      id\n      email\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;