/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  __typename?: 'AppUser';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  login: Scalars['String'];
  poles: Array<Pole>;
  restaurant?: Maybe<Restaurant>;
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPole: Pole;
  createRestaurant: Restaurant;
  createTable: Table;
  createTicket: Ticket;
  createUser: AppUser;
  deletePole: Pole;
  deleteRestaurant: Restaurant;
  deleteTable: Table;
  deleteUser: AppUser;
  signIn: AppUser;
  signOut: AppUser;
  updateClosedAt: Ticket;
  updateDeliveredAt: Ticket;
  updatePlacedAt: Ticket;
  updatePole: Pole;
  updateRestaurantName: Restaurant;
  updateRestaurantOpeningTime: Restaurant;
  updateTable: Table;
  updateUser: AppUser;
  updateUserPassword: AppUser;
};


export type MutationCreatePoleArgs = {
  address: Scalars['String'];
  city: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  zipCode: Scalars['String'];
};


export type MutationCreateRestaurantArgs = {
  name: Scalars['String'];
  pole: Scalars['ID'];
};


export type MutationCreateTableArgs = {
  capacity: Scalars['Float'];
  number: Scalars['Float'];
  restaurant: Scalars['String'];
};


export type MutationCreateTicketArgs = {
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  restaurant: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  login: Scalars['String'];
  password: Scalars['String'];
  poles?: InputMaybe<Array<Scalars['String']>>;
  restaurant?: InputMaybe<Scalars['String']>;
  role: Scalars['String'];
};


export type MutationDeletePoleArgs = {
  id: Scalars['String'];
};


export type MutationDeleteRestaurantArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTableArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  rememberMe?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSignOutArgs = {
  id: Scalars['String'];
};


export type MutationUpdateClosedAtArgs = {
  id: Scalars['String'];
};


export type MutationUpdateDeliveredAtArgs = {
  id: Scalars['ID'];
  table: Scalars['String'];
};


export type MutationUpdatePlacedAtArgs = {
  id: Scalars['ID'];
  table: Scalars['String'];
};


export type MutationUpdatePoleArgs = {
  address: Scalars['String'];
  city: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  zipCode: Scalars['String'];
};


export type MutationUpdateRestaurantNameArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationUpdateRestaurantOpeningTimeArgs = {
  closeAt: Scalars['DateTime'];
  id: Scalars['ID'];
  openAt: Scalars['DateTime'];
};


export type MutationUpdateTableArgs = {
  capacity: Scalars['Float'];
  id: Scalars['ID'];
  number: Scalars['Float'];
  restaurant: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  email: Scalars['String'];
  id: Scalars['ID'];
  login: Scalars['String'];
  poles?: InputMaybe<Array<Scalars['String']>>;
  restaurant?: InputMaybe<Scalars['String']>;
  role: Scalars['String'];
};


export type MutationUpdateUserPasswordArgs = {
  id: Scalars['ID'];
  password: Scalars['String'];
};

export type Pole = {
  __typename?: 'Pole';
  address: Scalars['String'];
  appUser: AppUser;
  city: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  restaurant: Array<Restaurant>;
  updatedAt: Scalars['DateTime'];
  zipCode: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  Table: Table;
  Tables: Array<Table>;
  TablesByRestaurant: Array<Table>;
  Ticket: Ticket;
  Tickets: Array<Ticket>;
  TicketsByRestaurant: Array<Ticket>;
  getUserById: AppUser;
  getUsers: Array<AppUser>;
  myProfile: AppUser;
  poles: Array<Pole>;
  restaurants: Array<Restaurant>;
};


export type QueryTableArgs = {
  id: Scalars['String'];
};


export type QueryTablesByRestaurantArgs = {
  id: Scalars['String'];
};


export type QueryTicketArgs = {
  id: Scalars['String'];
};


export type QueryTicketsByRestaurantArgs = {
  id: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  closeAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  openAt: Scalars['DateTime'];
  pole: Pole;
  table: Array<Table>;
  ticket: Array<Ticket>;
  updatedAt: Scalars['DateTime'];
};

export type Table = {
  __typename?: 'Table';
  capacity: Scalars['Float'];
  id: Scalars['ID'];
  number: Scalars['Float'];
  restaurant: Restaurant;
  ticket: Array<Ticket>;
};

export type Ticket = {
  __typename?: 'Ticket';
  closedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  deliveredAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  number: Scalars['Float'];
  phoneNumber: Scalars['String'];
  placedAt: Scalars['DateTime'];
  restaurant: Restaurant;
  table: Table;
};

export type MyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQuery = { __typename?: 'Query', myProfile: { __typename?: 'AppUser', id: string, email: string } };

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  rememberMe: Scalars['Boolean'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AppUser', id: string, email: string } };

export type CreateUserMutationVariables = Exact<{
  login: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'AppUser', id: string, email: string } };


export const MyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<MyProfileQuery, MyProfileQueryVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rememberMe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"rememberMe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rememberMe"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"login"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;