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
  "\n  mutation SignIn($email: String!, $password: String!, $rememberMe: Boolean!) {\n    signIn(email: $email, password: $password, rememberMe: $rememberMe) {\n      id\n      email\n    }\n  }\n":
    types.SignInDocument,
  "\n  mutation SignOut($signOutId: String!) {\n    signOut(id: $signOutId) {\n      id\n    }\n  }\n":
    types.SignOutDocument,
  "\n  mutation PrepareAndSendResetPasswordEmail($email: String!) {\n    prepareAndSendResetPasswordEmail(email: $email)\n  }\n":
    types.PrepareAndSendResetPasswordEmailDocument,
  "\n  mutation updateUserPasswordWithToken($token: String!, $password: String!) {\n    updateUserPasswordWithToken(token: $token, password: $password)\n  }\n":
    types.UpdateUserPasswordWithTokenDocument,
  "\n  mutation UpdateUserPassword(\n    $updateUserPasswordId: ID!\n    $password: String!\n    $newUserPassword: String!\n  ) {\n    updateUserPassword(\n      id: $updateUserPasswordId\n      password: $password\n      newUserPassword: $newUserPassword\n    ) {\n      id\n    }\n  }\n":
    types.UpdateUserPasswordDocument,
  "\n  query MyProfile {\n    myProfile {\n      id\n      email\n      role\n      restaurant {\n        id\n        name\n        picture\n        ticketWaitingLimit\n        notComingTicketDisapearDelay\n        openAt\n        closeAt\n      }\n    }\n  }\n":
    types.MyProfileDocument,
  "\n  query GetUsers {\n    getUsers {\n      id\n      firstname\n      lastname\n      email\n      role\n      restaurant {\n        id\n        name\n        pole {\n          name\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n":
    types.GetUsersDocument,
  "\n  mutation CreateUser(\n    $firstname: String!\n    $email: String!\n    $role: String!\n    $lastname: String!\n    $restaurant: String\n  ) {\n    createUser(\n      firstname: $firstname\n      email: $email\n      role: $role\n      lastname: $lastname\n      restaurant: $restaurant\n    ) {\n      id\n    }\n  }\n":
    types.CreateUserDocument,
  "\n  mutation UpdateUser(\n    $updateUserId: ID!\n    $firstname: String!\n    $lastname: String!\n    $email: String!\n    $role: String!\n    $restaurant: String\n  ) {\n    updateUser(\n      id: $updateUserId\n      firstname: $firstname\n      lastname: $lastname\n      email: $email\n      role: $role\n      restaurant: $restaurant\n    ) {\n      id\n    }\n  }\n":
    types.UpdateUserDocument,
  "\n  mutation DeleteUser($deleteUserId: String!) {\n    deleteUser(id: $deleteUserId) {\n      firstname\n    }\n  }\n":
    types.DeleteUserDocument,
  "\n  query TicketsByRestaurant($restaurantId: ID!, $seats: Float) {\n    TicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n":
    types.TicketsByRestaurantDocument,
  "\n  query WaitingTicketsByRestaurant($restaurantId: ID!, $seats: Float) {\n    WaitingTicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n":
    types.WaitingTicketsByRestaurantDocument,
  "\n  query PlacedTicketsByRestaurant($restaurantId: ID!, $seats: Float) {\n    PlacedTicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n":
    types.PlacedTicketsByRestaurantDocument,
  "\n  query PaginatedAndSortedTickets(\n    $restaurantId: ID!\n    $globalFilter: String!\n    $pageSize: Float!\n    $pageNumber: Float!\n    $sort: [String!]!\n    $order: [Float!]!\n  ) {\n    PaginatedAndSortedTickets(\n      restaurantId: $restaurantId\n      globalFilter: $globalFilter\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sort: $sort\n      order: $order\n    ) {\n      totalCount\n      tickets {\n        number\n        name\n        seats\n        createdAt\n        deliveredAt\n        placedAt\n        closedAt\n      }\n    }\n  }\n":
    types.PaginatedAndSortedTicketsDocument,
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
  "\n  query Table($tableId: String!) {\n    Table(id: $tableId) {\n      id\n      number\n      capacity\n    }\n  }\n":
    types.TableDocument,
  "\n  mutation CreateTable(\n    $number: Float!\n    $capacity: Float!\n    $restaurant: String!\n  ) {\n    createTable(number: $number, capacity: $capacity, restaurant: $restaurant) {\n      capacity\n      number\n      restaurant {\n        id\n      }\n    }\n  }\n":
    types.CreateTableDocument,
  "\n  mutation UpdateTable(\n    $updateTableId: ID!\n    $number: Float!\n    $capacity: Float!\n  ) {\n    updateTable(id: $updateTableId, number: $number, capacity: $capacity) {\n      capacity\n      number\n    }\n  }\n":
    types.UpdateTableDocument,
  "\n  mutation DeleteTable($deleteTableId: String!) {\n    deleteTable(id: $deleteTableId) {\n      id\n    }\n  }\n":
    types.DeleteTableDocument,
  "\n  query Poles {\n    poles {\n      id\n      name\n      address\n      zipCode\n      city\n      email\n      restaurant {\n        id\n        name\n      }\n    }\n  }\n":
    types.PolesDocument,
  "\n  mutation CreatePole(\n    $name: String!\n    $address: String!\n    $zipCode: String!\n    $city: String!\n    $email: String!\n  ) {\n    createPole(\n      name: $name\n      address: $address\n      zipCode: $zipCode\n      city: $city\n      email: $email\n    ) {\n      id\n    }\n  }\n":
    types.CreatePoleDocument,
  "\n  mutation UpdatePole(\n    $name: String!\n    $address: String!\n    $zipCode: String!\n    $city: String!\n    $email: String!\n    $updatePoleId: ID!\n  ) {\n    updatePole(\n      name: $name\n      address: $address\n      zipCode: $zipCode\n      city: $city\n      email: $email\n      id: $updatePoleId\n    ) {\n      id\n    }\n  }\n":
    types.UpdatePoleDocument,
  "\n  mutation DeletePole($deletePoleId: String!) {\n    deletePole(id: $deletePoleId) {\n      id\n    }\n  }\n":
    types.DeletePoleDocument,
  "\n  query StatsByRestaurant($restaurantId: String!) {\n    StatsByRestaurant(restaurantId: $restaurantId) {\n      tableCapacity\n      daysOfWeek\n      lastThirtyDays\n      countTicketsBySeat\n      countActualWeekTickets\n      countLastThirtyDaysTickets\n    }\n  }\n":
    types.StatsByRestaurantDocument,
  "\n  query GetRestaurants {\n    getRestaurants {\n      id\n      name\n      picture\n      pole {\n        id\n        name\n        address\n        zipCode\n        city\n        email\n      }\n    }\n  }\n":
    types.GetRestaurantsDocument,
  "\n  mutation UpdateRestaurant(\n    $updateRestaurantId: ID!\n    $ticketWaitingLimit: Float!\n    $notComingTicketDisapearDelay: Float!\n    $name: String!\n    $picture: String\n  ) {\n    updateRestaurant(\n      id: $updateRestaurantId\n      ticketWaitingLimit: $ticketWaitingLimit\n      notComingTicketDisapearDelay: $notComingTicketDisapearDelay\n      name: $name\n      picture: $picture\n    ) {\n      id\n      name\n      picture\n      ticketWaitingLimit\n      notComingTicketDisapearDelay\n      openAt\n      closeAt\n    }\n  }\n":
    types.UpdateRestaurantDocument,
  "\n  mutation UpdateRestaurantOpeningTime(\n    $updateRestaurantOpeningTimeId: ID!\n    $hourOpenAt: Float!\n    $minutesOpenAt: Float!\n    $hourCloseAt: Float!\n    $minutesCloseAt: Float!\n  ) {\n    updateRestaurantOpeningTime(\n      id: $updateRestaurantOpeningTimeId\n      hourOpenAt: $hourOpenAt\n      minutesOpenAt: $minutesOpenAt\n      hourCloseAt: $hourCloseAt\n      minutesCloseAt: $minutesCloseAt\n    ) {\n      closeAt\n      openAt\n    }\n  }\n":
    types.UpdateRestaurantOpeningTimeDocument,
  "\n  mutation CreateRestaurant(\n    $name: String!\n    $notComingTicketDisapearDelay: Float!\n    $pole: ID!\n    $ticketWaitingLimit: Float!\n    $picture: String\n  ) {\n    createRestaurant(\n      name: $name\n      notComingTicketDisapearDelay: $notComingTicketDisapearDelay\n      pole: $pole\n      ticketWaitingLimit: $ticketWaitingLimit\n      picture: $picture\n    ) {\n      id\n    }\n  }\n":
    types.CreateRestaurantDocument,
  "\n  mutation DeleteRestaurant($deleteRestaurantId: String!) {\n    deleteRestaurant(id: $deleteRestaurantId) {\n      id\n    }\n  }\n":
    types.DeleteRestaurantDocument,
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
  source: "\n  mutation SignIn($email: String!, $password: String!, $rememberMe: Boolean!) {\n    signIn(email: $email, password: $password, rememberMe: $rememberMe) {\n      id\n      email\n    }\n  }\n"
): (typeof documents)["\n  mutation SignIn($email: String!, $password: String!, $rememberMe: Boolean!) {\n    signIn(email: $email, password: $password, rememberMe: $rememberMe) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SignOut($signOutId: String!) {\n    signOut(id: $signOutId) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation SignOut($signOutId: String!) {\n    signOut(id: $signOutId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation PrepareAndSendResetPasswordEmail($email: String!) {\n    prepareAndSendResetPasswordEmail(email: $email)\n  }\n"
): (typeof documents)["\n  mutation PrepareAndSendResetPasswordEmail($email: String!) {\n    prepareAndSendResetPasswordEmail(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation updateUserPasswordWithToken($token: String!, $password: String!) {\n    updateUserPasswordWithToken(token: $token, password: $password)\n  }\n"
): (typeof documents)["\n  mutation updateUserPasswordWithToken($token: String!, $password: String!) {\n    updateUserPasswordWithToken(token: $token, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateUserPassword(\n    $updateUserPasswordId: ID!\n    $password: String!\n    $newUserPassword: String!\n  ) {\n    updateUserPassword(\n      id: $updateUserPasswordId\n      password: $password\n      newUserPassword: $newUserPassword\n    ) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateUserPassword(\n    $updateUserPasswordId: ID!\n    $password: String!\n    $newUserPassword: String!\n  ) {\n    updateUserPassword(\n      id: $updateUserPasswordId\n      password: $password\n      newUserPassword: $newUserPassword\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query MyProfile {\n    myProfile {\n      id\n      email\n      role\n      restaurant {\n        id\n        name\n        picture\n        ticketWaitingLimit\n        notComingTicketDisapearDelay\n        openAt\n        closeAt\n      }\n    }\n  }\n"
): (typeof documents)["\n  query MyProfile {\n    myProfile {\n      id\n      email\n      role\n      restaurant {\n        id\n        name\n        picture\n        ticketWaitingLimit\n        notComingTicketDisapearDelay\n        openAt\n        closeAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetUsers {\n    getUsers {\n      id\n      firstname\n      lastname\n      email\n      role\n      restaurant {\n        id\n        name\n        pole {\n          name\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"
): (typeof documents)["\n  query GetUsers {\n    getUsers {\n      id\n      firstname\n      lastname\n      email\n      role\n      restaurant {\n        id\n        name\n        pole {\n          name\n        }\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateUser(\n    $firstname: String!\n    $email: String!\n    $role: String!\n    $lastname: String!\n    $restaurant: String\n  ) {\n    createUser(\n      firstname: $firstname\n      email: $email\n      role: $role\n      lastname: $lastname\n      restaurant: $restaurant\n    ) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateUser(\n    $firstname: String!\n    $email: String!\n    $role: String!\n    $lastname: String!\n    $restaurant: String\n  ) {\n    createUser(\n      firstname: $firstname\n      email: $email\n      role: $role\n      lastname: $lastname\n      restaurant: $restaurant\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateUser(\n    $updateUserId: ID!\n    $firstname: String!\n    $lastname: String!\n    $email: String!\n    $role: String!\n    $restaurant: String\n  ) {\n    updateUser(\n      id: $updateUserId\n      firstname: $firstname\n      lastname: $lastname\n      email: $email\n      role: $role\n      restaurant: $restaurant\n    ) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateUser(\n    $updateUserId: ID!\n    $firstname: String!\n    $lastname: String!\n    $email: String!\n    $role: String!\n    $restaurant: String\n  ) {\n    updateUser(\n      id: $updateUserId\n      firstname: $firstname\n      lastname: $lastname\n      email: $email\n      role: $role\n      restaurant: $restaurant\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteUser($deleteUserId: String!) {\n    deleteUser(id: $deleteUserId) {\n      firstname\n    }\n  }\n"
): (typeof documents)["\n  mutation DeleteUser($deleteUserId: String!) {\n    deleteUser(id: $deleteUserId) {\n      firstname\n    }\n  }\n"];
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
  source: "\n  query WaitingTicketsByRestaurant($restaurantId: ID!, $seats: Float) {\n    WaitingTicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n"
): (typeof documents)["\n  query WaitingTicketsByRestaurant($restaurantId: ID!, $seats: Float) {\n    WaitingTicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query PlacedTicketsByRestaurant($restaurantId: ID!, $seats: Float) {\n    PlacedTicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n"
): (typeof documents)["\n  query PlacedTicketsByRestaurant($restaurantId: ID!, $seats: Float) {\n    PlacedTicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {\n      id\n      number\n      name\n      seats\n      email\n      phoneNumber\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n      table {\n        id\n        number\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query PaginatedAndSortedTickets(\n    $restaurantId: ID!\n    $globalFilter: String!\n    $pageSize: Float!\n    $pageNumber: Float!\n    $sort: [String!]!\n    $order: [Float!]!\n  ) {\n    PaginatedAndSortedTickets(\n      restaurantId: $restaurantId\n      globalFilter: $globalFilter\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sort: $sort\n      order: $order\n    ) {\n      totalCount\n      tickets {\n        number\n        name\n        seats\n        createdAt\n        deliveredAt\n        placedAt\n        closedAt\n      }\n    }\n  }\n"
): (typeof documents)["\n  query PaginatedAndSortedTickets(\n    $restaurantId: ID!\n    $globalFilter: String!\n    $pageSize: Float!\n    $pageNumber: Float!\n    $sort: [String!]!\n    $order: [Float!]!\n  ) {\n    PaginatedAndSortedTickets(\n      restaurantId: $restaurantId\n      globalFilter: $globalFilter\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sort: $sort\n      order: $order\n    ) {\n      totalCount\n      tickets {\n        number\n        name\n        seats\n        createdAt\n        deliveredAt\n        placedAt\n        closedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ExportTicketsByRestaurant(\n    $restaurantId: ID!\n    $dateMin: DateTime\n    $dateMax: DateTime\n  ) {\n    ExportTicketsByRestaurant(\n      restaurantId: $restaurantId\n      dateMin: $dateMin\n      dateMax: $dateMax\n    ) {\n      number\n      name\n      email\n      phoneNumber\n      seats\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n    }\n  }\n"
): (typeof documents)["\n  query ExportTicketsByRestaurant(\n    $restaurantId: ID!\n    $dateMin: DateTime\n    $dateMax: DateTime\n  ) {\n    ExportTicketsByRestaurant(\n      restaurantId: $restaurantId\n      dateMin: $dateMin\n      dateMax: $dateMax\n    ) {\n      number\n      name\n      email\n      phoneNumber\n      seats\n      createdAt\n      deliveredAt\n      placedAt\n      closedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateDeliveredAt($updateDeliveredAtId: ID!, $table: String!) {\n    updateDeliveredAt(id: $updateDeliveredAtId, table: $table) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateDeliveredAt($updateDeliveredAtId: ID!, $table: String!) {\n    updateDeliveredAt(id: $updateDeliveredAtId, table: $table) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdatePlacedAt($updatePlacedAtId: String!) {\n    updatePlacedAt(id: $updatePlacedAtId) {\n      id\n      deliveredAt\n      placedAt\n      closedAt\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdatePlacedAt($updatePlacedAtId: String!) {\n    updatePlacedAt(id: $updatePlacedAtId) {\n      id\n      deliveredAt\n      placedAt\n      closedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateClosedAt($updateClosedAtId: String!) {\n    updateClosedAt(id: $updateClosedAtId) {\n      id\n      closedAt\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateClosedAt($updateClosedAtId: String!) {\n    updateClosedAt(id: $updateClosedAtId) {\n      id\n      closedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query TablesByRestaurant($restaurantId: ID!, $capacity: Float) {\n    TablesByRestaurant(restaurantId: $restaurantId, capacity: $capacity) {\n      id\n      number\n      capacity\n    }\n  }\n"
): (typeof documents)["\n  query TablesByRestaurant($restaurantId: ID!, $capacity: Float) {\n    TablesByRestaurant(restaurantId: $restaurantId, capacity: $capacity) {\n      id\n      number\n      capacity\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Table($tableId: String!) {\n    Table(id: $tableId) {\n      id\n      number\n      capacity\n    }\n  }\n"
): (typeof documents)["\n  query Table($tableId: String!) {\n    Table(id: $tableId) {\n      id\n      number\n      capacity\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateTable(\n    $number: Float!\n    $capacity: Float!\n    $restaurant: String!\n  ) {\n    createTable(number: $number, capacity: $capacity, restaurant: $restaurant) {\n      capacity\n      number\n      restaurant {\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateTable(\n    $number: Float!\n    $capacity: Float!\n    $restaurant: String!\n  ) {\n    createTable(number: $number, capacity: $capacity, restaurant: $restaurant) {\n      capacity\n      number\n      restaurant {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateTable(\n    $updateTableId: ID!\n    $number: Float!\n    $capacity: Float!\n  ) {\n    updateTable(id: $updateTableId, number: $number, capacity: $capacity) {\n      capacity\n      number\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateTable(\n    $updateTableId: ID!\n    $number: Float!\n    $capacity: Float!\n  ) {\n    updateTable(id: $updateTableId, number: $number, capacity: $capacity) {\n      capacity\n      number\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteTable($deleteTableId: String!) {\n    deleteTable(id: $deleteTableId) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation DeleteTable($deleteTableId: String!) {\n    deleteTable(id: $deleteTableId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Poles {\n    poles {\n      id\n      name\n      address\n      zipCode\n      city\n      email\n      restaurant {\n        id\n        name\n      }\n    }\n  }\n"
): (typeof documents)["\n  query Poles {\n    poles {\n      id\n      name\n      address\n      zipCode\n      city\n      email\n      restaurant {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreatePole(\n    $name: String!\n    $address: String!\n    $zipCode: String!\n    $city: String!\n    $email: String!\n  ) {\n    createPole(\n      name: $name\n      address: $address\n      zipCode: $zipCode\n      city: $city\n      email: $email\n    ) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation CreatePole(\n    $name: String!\n    $address: String!\n    $zipCode: String!\n    $city: String!\n    $email: String!\n  ) {\n    createPole(\n      name: $name\n      address: $address\n      zipCode: $zipCode\n      city: $city\n      email: $email\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdatePole(\n    $name: String!\n    $address: String!\n    $zipCode: String!\n    $city: String!\n    $email: String!\n    $updatePoleId: ID!\n  ) {\n    updatePole(\n      name: $name\n      address: $address\n      zipCode: $zipCode\n      city: $city\n      email: $email\n      id: $updatePoleId\n    ) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdatePole(\n    $name: String!\n    $address: String!\n    $zipCode: String!\n    $city: String!\n    $email: String!\n    $updatePoleId: ID!\n  ) {\n    updatePole(\n      name: $name\n      address: $address\n      zipCode: $zipCode\n      city: $city\n      email: $email\n      id: $updatePoleId\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeletePole($deletePoleId: String!) {\n    deletePole(id: $deletePoleId) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation DeletePole($deletePoleId: String!) {\n    deletePole(id: $deletePoleId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query StatsByRestaurant($restaurantId: String!) {\n    StatsByRestaurant(restaurantId: $restaurantId) {\n      tableCapacity\n      daysOfWeek\n      lastThirtyDays\n      countTicketsBySeat\n      countActualWeekTickets\n      countLastThirtyDaysTickets\n    }\n  }\n"
): (typeof documents)["\n  query StatsByRestaurant($restaurantId: String!) {\n    StatsByRestaurant(restaurantId: $restaurantId) {\n      tableCapacity\n      daysOfWeek\n      lastThirtyDays\n      countTicketsBySeat\n      countActualWeekTickets\n      countLastThirtyDaysTickets\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetRestaurants {\n    getRestaurants {\n      id\n      name\n      picture\n      pole {\n        id\n        name\n        address\n        zipCode\n        city\n        email\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetRestaurants {\n    getRestaurants {\n      id\n      name\n      picture\n      pole {\n        id\n        name\n        address\n        zipCode\n        city\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateRestaurant(\n    $updateRestaurantId: ID!\n    $ticketWaitingLimit: Float!\n    $notComingTicketDisapearDelay: Float!\n    $name: String!\n    $picture: String\n  ) {\n    updateRestaurant(\n      id: $updateRestaurantId\n      ticketWaitingLimit: $ticketWaitingLimit\n      notComingTicketDisapearDelay: $notComingTicketDisapearDelay\n      name: $name\n      picture: $picture\n    ) {\n      id\n      name\n      picture\n      ticketWaitingLimit\n      notComingTicketDisapearDelay\n      openAt\n      closeAt\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateRestaurant(\n    $updateRestaurantId: ID!\n    $ticketWaitingLimit: Float!\n    $notComingTicketDisapearDelay: Float!\n    $name: String!\n    $picture: String\n  ) {\n    updateRestaurant(\n      id: $updateRestaurantId\n      ticketWaitingLimit: $ticketWaitingLimit\n      notComingTicketDisapearDelay: $notComingTicketDisapearDelay\n      name: $name\n      picture: $picture\n    ) {\n      id\n      name\n      picture\n      ticketWaitingLimit\n      notComingTicketDisapearDelay\n      openAt\n      closeAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateRestaurantOpeningTime(\n    $updateRestaurantOpeningTimeId: ID!\n    $hourOpenAt: Float!\n    $minutesOpenAt: Float!\n    $hourCloseAt: Float!\n    $minutesCloseAt: Float!\n  ) {\n    updateRestaurantOpeningTime(\n      id: $updateRestaurantOpeningTimeId\n      hourOpenAt: $hourOpenAt\n      minutesOpenAt: $minutesOpenAt\n      hourCloseAt: $hourCloseAt\n      minutesCloseAt: $minutesCloseAt\n    ) {\n      closeAt\n      openAt\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateRestaurantOpeningTime(\n    $updateRestaurantOpeningTimeId: ID!\n    $hourOpenAt: Float!\n    $minutesOpenAt: Float!\n    $hourCloseAt: Float!\n    $minutesCloseAt: Float!\n  ) {\n    updateRestaurantOpeningTime(\n      id: $updateRestaurantOpeningTimeId\n      hourOpenAt: $hourOpenAt\n      minutesOpenAt: $minutesOpenAt\n      hourCloseAt: $hourCloseAt\n      minutesCloseAt: $minutesCloseAt\n    ) {\n      closeAt\n      openAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateRestaurant(\n    $name: String!\n    $notComingTicketDisapearDelay: Float!\n    $pole: ID!\n    $ticketWaitingLimit: Float!\n    $picture: String\n  ) {\n    createRestaurant(\n      name: $name\n      notComingTicketDisapearDelay: $notComingTicketDisapearDelay\n      pole: $pole\n      ticketWaitingLimit: $ticketWaitingLimit\n      picture: $picture\n    ) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateRestaurant(\n    $name: String!\n    $notComingTicketDisapearDelay: Float!\n    $pole: ID!\n    $ticketWaitingLimit: Float!\n    $picture: String\n  ) {\n    createRestaurant(\n      name: $name\n      notComingTicketDisapearDelay: $notComingTicketDisapearDelay\n      pole: $pole\n      ticketWaitingLimit: $ticketWaitingLimit\n      picture: $picture\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteRestaurant($deleteRestaurantId: String!) {\n    deleteRestaurant(id: $deleteRestaurantId) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation DeleteRestaurant($deleteRestaurantId: String!) {\n    deleteRestaurant(id: $deleteRestaurantId) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
