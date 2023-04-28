/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n  mutation SignIn($email: String!, $password: String!, $rememberMe: Boolean!) {\n    signIn(email: $email, password: $password, rememberMe: $rememberMe) {\n      id\n      email\n    }\n  }\n":
    types.SignInDocument,
  "\n  mutation SignOut($signOutId: String!) {\n    signOut(id: $signOutId) {\n      id\n    }\n  }\n":
    types.SignOutDocument,
  "\n  mutation SendResetPasswordEmail($email: String!) {\n    sendResetPasswordEmail(email: $email)\n  }\n":
    types.SendResetPasswordEmailDocument,
  "\n  mutation updateUserPasswordWithToken($token: String!, $password: String!) {\n    updateUserPasswordWithToken(token: $token, password: $password)\n  }\n":
    types.UpdateUserPasswordWithTokenDocument,
  "\n  query MyProfile {\n    myProfile {\n      id\n      email\n      role\n      poles {\n        id\n        name\n      }\n      restaurant {\n        id\n        name\n      }\n    }\n  }\n":
    types.MyProfileDocument,
  "\n  query TicketsByRestaurant($restaurantId: ID!, $seats: Float) {\n    TicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n":
    types.TicketsByRestaurantDocument,
  "\n  query ExportTicketsByRestaurant(\n    $restaurantId: ID!\n    $dateMin: DateTime\n    $dateMax: DateTime\n  ) {\n    ExportTicketsByRestaurant(\n      restaurantId: $restaurantId\n      dateMin: $dateMin\n      dateMax: $dateMax\n    ) {\n      number\n      name\n      email\n      phoneNumber\n      seats\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n    }\n  }\n":
    types.ExportTicketsByRestaurantDocument,
  "\n  mutation UpdateDeliveredAt($updateDeliveredAtId: ID!, $table: String!) {\n    updateDeliveredAt(id: $updateDeliveredAtId, table: $table) {\n      id\n    }\n  }\n":
    types.UpdateDeliveredAtDocument,
  "\n  mutation UpdatePlacedAt($updatePlacedAtId: String!) {\n    updatePlacedAt(id: $updatePlacedAtId) {\n      id\n      deliveredAt\n      placedAt\n      closedAt\n    }\n  }\n":
    types.UpdatePlacedAtDocument,
  "\n  mutation UpdateClosedAt($updateClosedAtId: String!) {\n    updateClosedAt(id: $updateClosedAtId) {\n      id\n      closedAt\n    }\n  }\n":
    types.UpdateClosedAtDocument,
  "\n  query TablesByRestaurant($restaurantId: ID!, $capacity: Float) {\n    TablesByRestaurant(restaurantId: $restaurantId, capacity: $capacity) {\n      id\n      number\n      capacity\n    }\n  }\n":
    types.TablesByRestaurantDocument,
  "\n  query StatsByRestaurant($restaurantId: String!) {\n    StatsByRestaurant(restaurantId: $restaurantId) {\n      tableCapacity\n      daysOfWeek\n      lastThirtyDays\n      countTicketsBySeat\n      countActualWeekTickets\n      countLastThirtyDaysTickets\n    }\n  }\n":
    types.StatsByRestaurantDocument,
};

export function graphql(
  source: "\n  mutation SignIn($email: String!, $password: String!, $rememberMe: Boolean!) {\n    signIn(email: $email, password: $password, rememberMe: $rememberMe) {\n      id\n      email\n    }\n  }\n"
): (typeof documents)["\n  mutation SignIn($email: String!, $password: String!, $rememberMe: Boolean!) {\n    signIn(email: $email, password: $password, rememberMe: $rememberMe) {\n      id\n      email\n    }\n  }\n"];
export function graphql(
  source: "\n  mutation SignOut($signOutId: String!) {\n    signOut(id: $signOutId) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation SignOut($signOutId: String!) {\n    signOut(id: $signOutId) {\n      id\n    }\n  }\n"];
export function graphql(
  source: "\n  mutation SendResetPasswordEmail($email: String!) {\n    sendResetPasswordEmail(email: $email)\n  }\n"
): (typeof documents)["\n  mutation SendResetPasswordEmail($email: String!) {\n    sendResetPasswordEmail(email: $email)\n  }\n"];
export function graphql(
  source: "\n  mutation updateUserPasswordWithToken($token: String!, $password: String!) {\n    updateUserPasswordWithToken(token: $token, password: $password)\n  }\n"
): (typeof documents)["\n  mutation updateUserPasswordWithToken($token: String!, $password: String!) {\n    updateUserPasswordWithToken(token: $token, password: $password)\n  }\n"];
export function graphql(
  source: "\n  query MyProfile {\n    myProfile {\n      id\n      email\n      role\n      poles {\n        id\n        name\n      }\n      restaurant {\n        id\n        name\n      }\n    }\n  }\n"
): (typeof documents)["\n  query MyProfile {\n    myProfile {\n      id\n      email\n      role\n      poles {\n        id\n        name\n      }\n      restaurant {\n        id\n        name\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query TicketsByRestaurant($restaurantId: ID!, $seats: Float) {\n    TicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n"
): (typeof documents)["\n  query TicketsByRestaurant($restaurantId: ID!, $seats: Float) {\n    TicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n"];
export function graphql(
  source: "\n  query ExportTicketsByRestaurant(\n    $restaurantId: ID!\n    $dateMin: DateTime\n    $dateMax: DateTime\n  ) {\n    ExportTicketsByRestaurant(\n      restaurantId: $restaurantId\n      dateMin: $dateMin\n      dateMax: $dateMax\n    ) {\n      number\n      name\n      email\n      phoneNumber\n      seats\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n    }\n  }\n"
): (typeof documents)["\n  query ExportTicketsByRestaurant(\n    $restaurantId: ID!\n    $dateMin: DateTime\n    $dateMax: DateTime\n  ) {\n    ExportTicketsByRestaurant(\n      restaurantId: $restaurantId\n      dateMin: $dateMin\n      dateMax: $dateMax\n    ) {\n      number\n      name\n      email\n      phoneNumber\n      seats\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n    }\n  }\n"];
export function graphql(
  source: "\n  mutation UpdateDeliveredAt($updateDeliveredAtId: ID!, $table: String!) {\n    updateDeliveredAt(id: $updateDeliveredAtId, table: $table) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateDeliveredAt($updateDeliveredAtId: ID!, $table: String!) {\n    updateDeliveredAt(id: $updateDeliveredAtId, table: $table) {\n      id\n    }\n  }\n"];
export function graphql(
  source: "\n  mutation UpdatePlacedAt($updatePlacedAtId: String!) {\n    updatePlacedAt(id: $updatePlacedAtId) {\n      id\n      deliveredAt\n      placedAt\n      closedAt\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdatePlacedAt($updatePlacedAtId: String!) {\n    updatePlacedAt(id: $updatePlacedAtId) {\n      id\n      deliveredAt\n      placedAt\n      closedAt\n    }\n  }\n"];
export function graphql(
  source: "\n  mutation UpdateClosedAt($updateClosedAtId: String!) {\n    updateClosedAt(id: $updateClosedAtId) {\n      id\n      closedAt\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateClosedAt($updateClosedAtId: String!) {\n    updateClosedAt(id: $updateClosedAtId) {\n      id\n      closedAt\n    }\n  }\n"];
export function graphql(
  source: "\n  query TablesByRestaurant($restaurantId: ID!, $capacity: Float) {\n    TablesByRestaurant(restaurantId: $restaurantId, capacity: $capacity) {\n      id\n      number\n      capacity\n    }\n  }\n"
): (typeof documents)["\n  query TablesByRestaurant($restaurantId: ID!, $capacity: Float) {\n    TablesByRestaurant(restaurantId: $restaurantId, capacity: $capacity) {\n      id\n      number\n      capacity\n    }\n  }\n"];
export function graphql(
  source: "\n  query StatsByRestaurant($restaurantId: String!) {\n    StatsByRestaurant(restaurantId: $restaurantId) {\n      tableCapacity\n      daysOfWeek\n      lastThirtyDays\n      countTicketsBySeat\n      countActualWeekTickets\n      countLastThirtyDaysTickets\n    }\n  }\n"
): (typeof documents)["\n  query StatsByRestaurant($restaurantId: String!) {\n    StatsByRestaurant(restaurantId: $restaurantId) {\n      tableCapacity\n      daysOfWeek\n      lastThirtyDays\n      countTicketsBySeat\n      countActualWeekTickets\n      countLastThirtyDaysTickets\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
