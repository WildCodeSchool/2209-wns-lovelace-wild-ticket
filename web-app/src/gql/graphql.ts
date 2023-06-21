/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AppUser = {
  __typename?: "AppUser";
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  id: Scalars["ID"];
  resetPasswordToken?: Maybe<Scalars["String"]>;
  resetPasswordTokenExpiration?: Maybe<Scalars["DateTime"]>;
  restaurant?: Maybe<Restaurant>;
  role: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createPole: Pole;
  createRestaurant: Restaurant;
  createTable: Table;
  createTicket: Ticket;
  createUser: AppUser;
  deletePole: Pole;
  deleteRestaurant: Restaurant;
  deleteTable: Table;
  deleteUser: AppUser;
  sendResetPasswordEmail: Scalars["Boolean"];
  signIn: AppUser;
  signOut: AppUser;
  updateClosedAt: Ticket;
  updateDeliveredAt: Ticket;
  updatePlacedAt: Ticket;
  updatePole: Pole;
  updateRestaurant: Restaurant;
  updateRestaurantOpeningTime: Restaurant;
  updateTable: Table;
  updateUser: AppUser;
  updateUserPassword: AppUser;
  updateUserPasswordWithToken: Scalars["Boolean"];
};

export type MutationCreatePoleArgs = {
  address: Scalars["String"];
  city: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  zipCode: Scalars["String"];
};

export type MutationCreateRestaurantArgs = {
  name: Scalars["String"];
  notComingTicketDisapearDelay: Scalars["Float"];
  picture?: InputMaybe<Scalars["String"]>;
  pole: Scalars["ID"];
  ticketWaitingLimit: Scalars["Float"];
};

export type MutationCreateTableArgs = {
  capacity: Scalars["Float"];
  number: Scalars["Float"];
  restaurant: Scalars["String"];
};

export type MutationCreateTicketArgs = {
  email?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  phoneNumber?: InputMaybe<Scalars["String"]>;
  restaurant: Scalars["String"];
  seats: Scalars["Float"];
};

export type MutationCreateUserArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  restaurant?: InputMaybe<Scalars["String"]>;
  role: Scalars["String"];
};

export type MutationDeletePoleArgs = {
  id: Scalars["String"];
};

export type MutationDeleteRestaurantArgs = {
  id: Scalars["String"];
};

export type MutationDeleteTableArgs = {
  id: Scalars["String"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["String"];
};

export type MutationSendResetPasswordEmailArgs = {
  email: Scalars["String"];
};

export type MutationSignInArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  rememberMe?: InputMaybe<Scalars["Boolean"]>;
};

export type MutationSignOutArgs = {
  id: Scalars["String"];
};

export type MutationUpdateClosedAtArgs = {
  id: Scalars["String"];
};

export type MutationUpdateDeliveredAtArgs = {
  id: Scalars["ID"];
  table: Scalars["String"];
};

export type MutationUpdatePlacedAtArgs = {
  id: Scalars["String"];
};

export type MutationUpdatePoleArgs = {
  address: Scalars["String"];
  city: Scalars["String"];
  email: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  zipCode: Scalars["String"];
};

export type MutationUpdateRestaurantArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
  notComingTicketDisapearDelay: Scalars["Float"];
  picture?: InputMaybe<Scalars["String"]>;
  ticketWaitingLimit: Scalars["Float"];
};

export type MutationUpdateRestaurantOpeningTimeArgs = {
  hourCloseAt: Scalars["Float"];
  hourOpenAt: Scalars["Float"];
  id: Scalars["ID"];
  minutesCloseAt: Scalars["Float"];
  minutesOpenAt: Scalars["Float"];
};

export type MutationUpdateTableArgs = {
  capacity: Scalars["Float"];
  id: Scalars["ID"];
  number: Scalars["Float"];
};

export type MutationUpdateUserArgs = {
  email: Scalars["String"];
  id: Scalars["ID"];
  restaurant?: InputMaybe<Scalars["String"]>;
  role: Scalars["String"];
};

export type MutationUpdateUserPasswordArgs = {
  id: Scalars["ID"];
  newUserPassword: Scalars["String"];
  password: Scalars["String"];
};

export type MutationUpdateUserPasswordWithTokenArgs = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type PageOfRestaurants = {
  __typename?: "PageOfRestaurants";
  nextPageNumber?: Maybe<Scalars["Int"]>;
  restaurants: Array<Restaurant>;
  totalCount: Scalars["Int"];
};

export type PageOfTickets = {
  __typename?: "PageOfTickets";
  tickets: Array<Ticket>;
  totalCount: Scalars["Int"];
};

export type Pole = {
  __typename?: "Pole";
  address: Scalars["String"];
  city: Scalars["String"];
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  restaurant?: Maybe<Array<Restaurant>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  zipCode: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  ExportTicketsByRestaurant: Array<Ticket>;
  PaginatedAndSortedTickets: PageOfTickets;
  PlacedTicketsByRestaurant: Array<Ticket>;
  StatsByRestaurant: Stats;
  Table: Table;
  Tables: Array<Table>;
  TablesByRestaurant: Array<Table>;
  Ticket: Ticket;
  Tickets: Array<Ticket>;
  TicketsByRestaurant: Array<Ticket>;
  WaitingTicketsByRestaurant: Array<Ticket>;
  getPaginateRestaurantsByPole: PageOfRestaurants;
  getPoleById: Pole;
  getRestaurantById: Restaurant;
  getRestaurants: Array<Restaurant>;
  getUserById: AppUser;
  getUsers: Array<AppUser>;
  myProfile: AppUser;
  poles: Array<Pole>;
};

export type QueryExportTicketsByRestaurantArgs = {
  dateMax?: InputMaybe<Scalars["DateTime"]>;
  dateMin?: InputMaybe<Scalars["DateTime"]>;
  restaurantId: Scalars["ID"];
  seats?: InputMaybe<Scalars["Float"]>;
};

export type QueryPaginatedAndSortedTicketsArgs = {
  globalFilter: Scalars["String"];
  order: Array<Scalars["Float"]>;
  pageNumber: Scalars["Float"];
  pageSize: Scalars["Float"];
  restaurantId: Scalars["ID"];
  sort?: InputMaybe<Array<Scalars["String"]>>;
};

export type QueryPlacedTicketsByRestaurantArgs = {
  restaurantId: Scalars["ID"];
  seats?: InputMaybe<Scalars["Float"]>;
};

export type QueryStatsByRestaurantArgs = {
  restaurantId: Scalars["String"];
};

export type QueryTableArgs = {
  id: Scalars["String"];
};

export type QueryTablesByRestaurantArgs = {
  capacity?: InputMaybe<Scalars["Float"]>;
  restaurantId: Scalars["ID"];
};

export type QueryTicketArgs = {
  id: Scalars["String"];
};

export type QueryTicketsByRestaurantArgs = {
  restaurantId: Scalars["ID"];
  seats?: InputMaybe<Scalars["Float"]>;
};

export type QueryWaitingTicketsByRestaurantArgs = {
  restaurantId: Scalars["ID"];
  seats?: InputMaybe<Scalars["Float"]>;
};

export type QueryGetPaginateRestaurantsByPoleArgs = {
  pageNumber: Scalars["Float"];
  pole: Scalars["String"];
};

export type QueryGetPoleByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetRestaurantByIdArgs = {
  id: Scalars["String"];
};

export type QueryGetUserByIdArgs = {
  id: Scalars["String"];
};

export type Restaurant = {
  __typename?: "Restaurant";
  closeAt?: Maybe<Scalars["DateTime"]>;
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  name: Scalars["String"];
  notComingTicketDisapearDelay: Scalars["Float"];
  openAt?: Maybe<Scalars["DateTime"]>;
  picture?: Maybe<Scalars["String"]>;
  pole: Pole;
  table: Array<Table>;
  ticket: Array<Ticket>;
  ticketWaitingLimit: Scalars["Float"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type Stats = {
  __typename?: "Stats";
  countActualWeekTickets: Array<Scalars["Float"]>;
  countLastThirtyDaysTickets: Array<Scalars["Float"]>;
  countTicketsBySeat: Array<Scalars["Float"]>;
  daysOfWeek: Array<Scalars["String"]>;
  lastThirtyDays: Array<Scalars["String"]>;
  tableCapacity: Array<Scalars["String"]>;
};

export type Table = {
  __typename?: "Table";
  capacity: Scalars["Float"];
  id: Scalars["ID"];
  number: Scalars["Float"];
  restaurant: Restaurant;
  ticket?: Maybe<Array<Ticket>>;
};

export type Ticket = {
  __typename?: "Ticket";
  closedAt?: Maybe<Scalars["DateTime"]>;
  createdAt: Scalars["DateTime"];
  deliveredAt?: Maybe<Scalars["DateTime"]>;
  email?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  number: Scalars["String"];
  phoneNumber?: Maybe<Scalars["String"]>;
  placedAt?: Maybe<Scalars["DateTime"]>;
  restaurant: Restaurant;
  seats: Scalars["Float"];
  table?: Maybe<Table>;
};

export type SignInMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
  rememberMe: Scalars["Boolean"];
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn: { __typename?: "AppUser"; id: string; email: string };
};

export type SignOutMutationVariables = Exact<{
  signOutId: Scalars["String"];
}>;

export type SignOutMutation = {
  __typename?: "Mutation";
  signOut: { __typename?: "AppUser"; id: string };
};

export type SendResetPasswordEmailMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type SendResetPasswordEmailMutation = {
  __typename?: "Mutation";
  sendResetPasswordEmail: boolean;
};

export type UpdateUserPasswordWithTokenMutationVariables = Exact<{
  token: Scalars["String"];
  password: Scalars["String"];
}>;

export type UpdateUserPasswordWithTokenMutation = {
  __typename?: "Mutation";
  updateUserPasswordWithToken: boolean;
};

export type UpdateUserPasswordMutationVariables = Exact<{
  updateUserPasswordId: Scalars["ID"];
  password: Scalars["String"];
  newUserPassword: Scalars["String"];
}>;

export type UpdateUserPasswordMutation = {
  __typename?: "Mutation";
  updateUserPassword: { __typename?: "AppUser"; id: string };
};

export type MyProfileQueryVariables = Exact<{ [key: string]: never }>;

export type MyProfileQuery = {
  __typename?: "Query";
  myProfile: {
    __typename?: "AppUser";
    id: string;
    email: string;
    role: string;
    restaurant?: {
      __typename?: "Restaurant";
      id: string;
      name: string;
      picture?: string | null;
      ticketWaitingLimit: number;
      notComingTicketDisapearDelay: number;
      openAt?: any | null;
      closeAt?: any | null;
    } | null;
  };
};

export type TicketsByRestaurantQueryVariables = Exact<{
  restaurantId: Scalars["ID"];
  seats?: InputMaybe<Scalars["Float"]>;
}>;

export type TicketsByRestaurantQuery = {
  __typename?: "Query";
  TicketsByRestaurant: Array<{
    __typename?: "Ticket";
    id: string;
    number: string;
    name: string;
    seats: number;
    email?: string | null;
    phoneNumber?: string | null;
    createdAt: any;
    deliveredAt?: any | null;
    placedAt?: any | null;
    closedAt?: any | null;
    table?: { __typename?: "Table"; id: string; number: number } | null;
  }>;
};

export type WaitingTicketsByRestaurantQueryVariables = Exact<{
  restaurantId: Scalars["ID"];
  seats?: InputMaybe<Scalars["Float"]>;
}>;

export type WaitingTicketsByRestaurantQuery = {
  __typename?: "Query";
  WaitingTicketsByRestaurant: Array<{
    __typename?: "Ticket";
    id: string;
    number: string;
    name: string;
    seats: number;
    email?: string | null;
    phoneNumber?: string | null;
    createdAt: any;
    deliveredAt?: any | null;
    placedAt?: any | null;
    closedAt?: any | null;
    table?: { __typename?: "Table"; id: string; number: number } | null;
  }>;
};

export type PlacedTicketsByRestaurantQueryVariables = Exact<{
  restaurantId: Scalars["ID"];
  seats?: InputMaybe<Scalars["Float"]>;
}>;

export type PlacedTicketsByRestaurantQuery = {
  __typename?: "Query";
  PlacedTicketsByRestaurant: Array<{
    __typename?: "Ticket";
    id: string;
    number: string;
    name: string;
    seats: number;
    email?: string | null;
    phoneNumber?: string | null;
    createdAt: any;
    deliveredAt?: any | null;
    placedAt?: any | null;
    closedAt?: any | null;
    table?: { __typename?: "Table"; id: string; number: number } | null;
  }>;
};

export type PaginatedAndSortedTicketsQueryVariables = Exact<{
  restaurantId: Scalars["ID"];
  globalFilter: Scalars["String"];
  pageSize: Scalars["Float"];
  pageNumber: Scalars["Float"];
  sort: Array<Scalars["String"]> | Scalars["String"];
  order: Array<Scalars["Float"]> | Scalars["Float"];
}>;

export type PaginatedAndSortedTicketsQuery = {
  __typename?: "Query";
  PaginatedAndSortedTickets: {
    __typename?: "PageOfTickets";
    totalCount: number;
    tickets: Array<{
      __typename?: "Ticket";
      number: string;
      name: string;
      seats: number;
      createdAt: any;
      deliveredAt?: any | null;
      placedAt?: any | null;
      closedAt?: any | null;
    }>;
  };
};

export type ExportTicketsByRestaurantQueryVariables = Exact<{
  restaurantId: Scalars["ID"];
  dateMin?: InputMaybe<Scalars["DateTime"]>;
  dateMax?: InputMaybe<Scalars["DateTime"]>;
}>;

export type ExportTicketsByRestaurantQuery = {
  __typename?: "Query";
  ExportTicketsByRestaurant: Array<{
    __typename?: "Ticket";
    number: string;
    name: string;
    email?: string | null;
    phoneNumber?: string | null;
    seats: number;
    createdAt: any;
    deliveredAt?: any | null;
    placedAt?: any | null;
    closedAt?: any | null;
  }>;
};

export type UpdateDeliveredAtMutationVariables = Exact<{
  updateDeliveredAtId: Scalars["ID"];
  table: Scalars["String"];
}>;

export type UpdateDeliveredAtMutation = {
  __typename?: "Mutation";
  updateDeliveredAt: { __typename?: "Ticket"; id: string };
};

export type UpdatePlacedAtMutationVariables = Exact<{
  updatePlacedAtId: Scalars["String"];
}>;

export type UpdatePlacedAtMutation = {
  __typename?: "Mutation";
  updatePlacedAt: {
    __typename?: "Ticket";
    id: string;
    deliveredAt?: any | null;
    placedAt?: any | null;
    closedAt?: any | null;
  };
};

export type UpdateClosedAtMutationVariables = Exact<{
  updateClosedAtId: Scalars["String"];
}>;

export type UpdateClosedAtMutation = {
  __typename?: "Mutation";
  updateClosedAt: { __typename?: "Ticket"; id: string; closedAt?: any | null };
};

export type TablesByRestaurantQueryVariables = Exact<{
  restaurantId: Scalars["ID"];
  capacity?: InputMaybe<Scalars["Float"]>;
}>;

export type TablesByRestaurantQuery = {
  __typename?: "Query";
  TablesByRestaurant: Array<{
    __typename?: "Table";
    id: string;
    number: number;
    capacity: number;
  }>;
};

export type PolesQueryVariables = Exact<{ [key: string]: never }>;

export type PolesQuery = {
  __typename?: "Query";
  poles: Array<{
    __typename?: "Pole";
    id: string;
    name: string;
    address: string;
    zipCode: string;
    city: string;
    email: string;
    restaurant?: Array<{
      __typename?: "Restaurant";
      id: string;
      name: string;
    }> | null;
  }>;
};

export type CreatePoleMutationVariables = Exact<{
  name: Scalars["String"];
  address: Scalars["String"];
  zipCode: Scalars["String"];
  city: Scalars["String"];
  email: Scalars["String"];
}>;

export type CreatePoleMutation = {
  __typename?: "Mutation";
  createPole: { __typename?: "Pole"; id: string };
};

export type UpdatePoleMutationVariables = Exact<{
  name: Scalars["String"];
  address: Scalars["String"];
  zipCode: Scalars["String"];
  city: Scalars["String"];
  email: Scalars["String"];
  updatePoleId: Scalars["ID"];
}>;

export type UpdatePoleMutation = {
  __typename?: "Mutation";
  updatePole: { __typename?: "Pole"; id: string };
};

export type DeletePoleMutationVariables = Exact<{
  deletePoleId: Scalars["String"];
}>;

export type DeletePoleMutation = {
  __typename?: "Mutation";
  deletePole: { __typename?: "Pole"; id: string };
};

export type StatsByRestaurantQueryVariables = Exact<{
  restaurantId: Scalars["String"];
}>;

export type StatsByRestaurantQuery = {
  __typename?: "Query";
  StatsByRestaurant: {
    __typename?: "Stats";
    tableCapacity: Array<string>;
    daysOfWeek: Array<string>;
    lastThirtyDays: Array<string>;
    countTicketsBySeat: Array<number>;
    countActualWeekTickets: Array<number>;
    countLastThirtyDaysTickets: Array<number>;
  };
};

export type GetRestaurantsQueryVariables = Exact<{ [key: string]: never }>;

export type GetRestaurantsQuery = {
  __typename?: "Query";
  getRestaurants: Array<{
    __typename?: "Restaurant";
    id: string;
    name: string;
    pole: {
      __typename?: "Pole";
      id: string;
      name: string;
      address: string;
      zipCode: string;
      city: string;
      email: string;
    };
  }>;
};

export type UpdateRestaurantMutationVariables = Exact<{
  updateRestaurantId: Scalars["ID"];
  ticketWaitingLimit: Scalars["Float"];
  notComingTicketDisapearDelay: Scalars["Float"];
  name: Scalars["String"];
  picture?: InputMaybe<Scalars["String"]>;
}>;

export type UpdateRestaurantMutation = {
  __typename?: "Mutation";
  updateRestaurant: {
    __typename?: "Restaurant";
    id: string;
    name: string;
    picture?: string | null;
    ticketWaitingLimit: number;
    notComingTicketDisapearDelay: number;
    openAt?: any | null;
    closeAt?: any | null;
  };
};

export type UpdateRestaurantOpeningTimeMutationVariables = Exact<{
  updateRestaurantOpeningTimeId: Scalars["ID"];
  hourOpenAt: Scalars["Float"];
  minutesOpenAt: Scalars["Float"];
  hourCloseAt: Scalars["Float"];
  minutesCloseAt: Scalars["Float"];
}>;

export type UpdateRestaurantOpeningTimeMutation = {
  __typename?: "Mutation";
  updateRestaurantOpeningTime: {
    __typename?: "Restaurant";
    closeAt?: any | null;
    openAt?: any | null;
  };
};

export const SignInDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignIn" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "rememberMe" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signIn" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "rememberMe" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "rememberMe" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignOut" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "signOutId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signOut" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "signOutId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
export const SendResetPasswordEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SendResetPasswordEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "sendResetPasswordEmail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SendResetPasswordEmailMutation,
  SendResetPasswordEmailMutationVariables
>;
export const UpdateUserPasswordWithTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateUserPasswordWithToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "token" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUserPasswordWithToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "token" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateUserPasswordWithTokenMutation,
  UpdateUserPasswordWithTokenMutationVariables
>;
export const UpdateUserPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateUserPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updateUserPasswordId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "newUserPassword" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUserPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updateUserPasswordId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "newUserPassword" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "newUserPassword" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateUserPasswordMutation,
  UpdateUserPasswordMutationVariables
>;
export const MyProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MyProfile" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myProfile" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "restaurant" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ticketWaitingLimit" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "notComingTicketDisapearDelay",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "openAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "closeAt" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyProfileQuery, MyProfileQueryVariables>;
export const TicketsByRestaurantDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TicketsByRestaurant" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "restaurantId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "seats" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "TicketsByRestaurant" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "restaurantId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "restaurantId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "seats" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "seats" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "number" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "seats" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phoneNumber" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "deliveredAt" } },
                { kind: "Field", name: { kind: "Name", value: "placedAt" } },
                { kind: "Field", name: { kind: "Name", value: "closedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "table" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "number" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TicketsByRestaurantQuery,
  TicketsByRestaurantQueryVariables
>;
export const WaitingTicketsByRestaurantDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "WaitingTicketsByRestaurant" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "restaurantId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "seats" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "WaitingTicketsByRestaurant" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "restaurantId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "restaurantId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "seats" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "seats" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "number" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "seats" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phoneNumber" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "deliveredAt" } },
                { kind: "Field", name: { kind: "Name", value: "placedAt" } },
                { kind: "Field", name: { kind: "Name", value: "closedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "table" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "number" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  WaitingTicketsByRestaurantQuery,
  WaitingTicketsByRestaurantQueryVariables
>;
export const PlacedTicketsByRestaurantDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PlacedTicketsByRestaurant" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "restaurantId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "seats" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "PlacedTicketsByRestaurant" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "restaurantId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "restaurantId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "seats" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "seats" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "number" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "seats" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phoneNumber" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "deliveredAt" } },
                { kind: "Field", name: { kind: "Name", value: "placedAt" } },
                { kind: "Field", name: { kind: "Name", value: "closedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "table" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "number" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PlacedTicketsByRestaurantQuery,
  PlacedTicketsByRestaurantQueryVariables
>;
export const PaginatedAndSortedTicketsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PaginatedAndSortedTickets" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "restaurantId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "globalFilter" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pageSize" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "pageNumber" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sort" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "String" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "order" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "Float" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "PaginatedAndSortedTickets" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "restaurantId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "restaurantId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "globalFilter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "globalFilter" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "pageSize" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pageSize" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "pageNumber" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pageNumber" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "order" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "order" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tickets" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "number" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "seats" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deliveredAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "placedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "closedAt" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PaginatedAndSortedTicketsQuery,
  PaginatedAndSortedTicketsQueryVariables
>;
export const ExportTicketsByRestaurantDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ExportTicketsByRestaurant" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "restaurantId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "dateMin" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "dateMax" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTime" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ExportTicketsByRestaurant" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "restaurantId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "restaurantId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "dateMin" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "dateMin" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "dateMax" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "dateMax" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "number" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phoneNumber" } },
                { kind: "Field", name: { kind: "Name", value: "seats" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "deliveredAt" } },
                { kind: "Field", name: { kind: "Name", value: "placedAt" } },
                { kind: "Field", name: { kind: "Name", value: "closedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ExportTicketsByRestaurantQuery,
  ExportTicketsByRestaurantQueryVariables
>;
export const UpdateDeliveredAtDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateDeliveredAt" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updateDeliveredAtId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "table" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateDeliveredAt" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updateDeliveredAtId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "table" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "table" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateDeliveredAtMutation,
  UpdateDeliveredAtMutationVariables
>;
export const UpdatePlacedAtDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePlacedAt" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updatePlacedAtId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePlacedAt" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updatePlacedAtId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "deliveredAt" } },
                { kind: "Field", name: { kind: "Name", value: "placedAt" } },
                { kind: "Field", name: { kind: "Name", value: "closedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdatePlacedAtMutation,
  UpdatePlacedAtMutationVariables
>;
export const UpdateClosedAtDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateClosedAt" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updateClosedAtId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateClosedAt" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updateClosedAtId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "closedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateClosedAtMutation,
  UpdateClosedAtMutationVariables
>;
export const TablesByRestaurantDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TablesByRestaurant" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "restaurantId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "capacity" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "TablesByRestaurant" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "restaurantId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "restaurantId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "capacity" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "capacity" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "number" } },
                { kind: "Field", name: { kind: "Name", value: "capacity" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TablesByRestaurantQuery,
  TablesByRestaurantQueryVariables
>;
export const PolesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Poles" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "poles" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "zipCode" } },
                { kind: "Field", name: { kind: "Name", value: "city" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "restaurant" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PolesQuery, PolesQueryVariables>;
export const CreatePoleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreatePole" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "address" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zipCode" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "city" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createPole" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "address" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "address" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zipCode" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zipCode" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "city" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "city" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreatePoleMutation, CreatePoleMutationVariables>;
export const UpdatePoleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePole" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "address" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zipCode" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "city" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updatePoleId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePole" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "address" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "address" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zipCode" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zipCode" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "city" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "city" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updatePoleId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatePoleMutation, UpdatePoleMutationVariables>;
export const DeletePoleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeletePole" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "deletePoleId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deletePole" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "deletePoleId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeletePoleMutation, DeletePoleMutationVariables>;
export const StatsByRestaurantDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StatsByRestaurant" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "restaurantId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "StatsByRestaurant" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "restaurantId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "restaurantId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tableCapacity" },
                },
                { kind: "Field", name: { kind: "Name", value: "daysOfWeek" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastThirtyDays" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "countTicketsBySeat" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "countActualWeekTickets" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "countLastThirtyDaysTickets" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StatsByRestaurantQuery,
  StatsByRestaurantQueryVariables
>;
export const GetRestaurantsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetRestaurants" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getRestaurants" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pole" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "address" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "zipCode" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "city" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetRestaurantsQuery, GetRestaurantsQueryVariables>;
export const UpdateRestaurantDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateRestaurant" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updateRestaurantId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ticketWaitingLimit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "notComingTicketDisapearDelay" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "picture" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateRestaurant" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updateRestaurantId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ticketWaitingLimit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ticketWaitingLimit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "notComingTicketDisapearDelay" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "notComingTicketDisapearDelay" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "picture" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "picture" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "picture" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "ticketWaitingLimit" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notComingTicketDisapearDelay" },
                },
                { kind: "Field", name: { kind: "Name", value: "openAt" } },
                { kind: "Field", name: { kind: "Name", value: "closeAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateRestaurantMutation,
  UpdateRestaurantMutationVariables
>;
export const UpdateRestaurantOpeningTimeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateRestaurantOpeningTime" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updateRestaurantOpeningTimeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "hourOpenAt" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "minutesOpenAt" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "hourCloseAt" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "minutesCloseAt" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateRestaurantOpeningTime" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "updateRestaurantOpeningTimeId",
                  },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "hourOpenAt" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "hourOpenAt" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "minutesOpenAt" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "minutesOpenAt" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "hourCloseAt" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "hourCloseAt" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "minutesCloseAt" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "minutesCloseAt" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "closeAt" } },
                { kind: "Field", name: { kind: "Name", value: "openAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateRestaurantOpeningTimeMutation,
  UpdateRestaurantOpeningTimeMutationVariables
>;
