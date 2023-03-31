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
  login: Scalars["String"];
  poles?: Maybe<Array<Pole>>;
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
  pole: Scalars["ID"];
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
  login: Scalars["String"];
  password: Scalars["String"];
  poles?: InputMaybe<Array<Scalars["String"]>>;
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
  login: Scalars["String"];
  poles?: InputMaybe<Array<Scalars["String"]>>;
  restaurant?: InputMaybe<Scalars["String"]>;
  role: Scalars["String"];
};

export type MutationUpdateUserPasswordArgs = {
  id: Scalars["ID"];
  password: Scalars["String"];
};

export type MutationUpdateUserPasswordWithTokenArgs = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type Pole = {
  __typename?: "Pole";
  address: Scalars["String"];
  appUser?: Maybe<AppUser>;
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
  Table: Table;
  Tables: Array<Table>;
  TablesByRestaurant: Array<Table>;
  Ticket: Ticket;
  Tickets: Array<Ticket>;
  TicketsByRestaurant: Array<Ticket>;
  getPoleById: Pole;
  getRestaurantById: Restaurant;
  getRestaurants: Array<Restaurant>;
  getUserById: AppUser;
  getUsers: Array<AppUser>;
  myProfile: AppUser;
  poles: Array<Pole>;
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
  openAt?: Maybe<Scalars["DateTime"]>;
  pole: Pole;
  table: Array<Table>;
  ticket: Array<Ticket>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
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
  email: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  number: Scalars["Float"];
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

export type MyProfileQueryVariables = Exact<{ [key: string]: never }>;

export type MyProfileQuery = {
  __typename?: "Query";
  myProfile: {
    __typename?: "AppUser";
    id: string;
    email: string;
    role: string;
    poles?: Array<{ __typename?: "Pole"; id: string; name: string }> | null;
    restaurant?: { __typename?: "Restaurant"; id: string; name: string } | null;
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
    number: number;
    name: string;
    seats: number;
    email: string;
    phoneNumber?: string | null;
    createdAt: any;
    deliveredAt?: any | null;
    placedAt?: any | null;
    closedAt?: any | null;
    table?: { __typename?: "Table"; id: string; number: number } | null;
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
                  name: { kind: "Name", value: "poles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
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
