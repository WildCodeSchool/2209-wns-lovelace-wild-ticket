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
  poles?: Maybe<Array<Pole>>;
  restaurant?: Maybe<Restaurant>;
  role: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
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
  updateRestaurant: Restaurant;
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
  seats: Scalars['Float'];
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
  id: Scalars['String'];
};


export type MutationUpdatePoleArgs = {
  address: Scalars['String'];
  city: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  zipCode: Scalars['String'];
};


export type MutationUpdateRestaurantArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationUpdateRestaurantOpeningTimeArgs = {
  hourCloseAt: Scalars['Float'];
  hourOpenAt: Scalars['Float'];
  id: Scalars['ID'];
  minutesCloseAt: Scalars['Float'];
  minutesOpenAt: Scalars['Float'];
};


export type MutationUpdateTableArgs = {
  capacity: Scalars['Float'];
  id: Scalars['ID'];
  number: Scalars['Float'];
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
  appUser?: Maybe<AppUser>;
  city: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  restaurant?: Maybe<Array<Restaurant>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
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
  getPoleById: Pole;
  getRestaurantById: Restaurant;
  getRestaurants: Array<Restaurant>;
  getUserById: AppUser;
  getUsers: Array<AppUser>;
  myProfile: AppUser;
  poles: Array<Pole>;
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


export type QueryGetPoleByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetRestaurantByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  closeAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  openAt?: Maybe<Scalars['DateTime']>;
  pole: Pole;
  table: Array<Table>;
  ticket: Array<Ticket>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Table = {
  __typename?: 'Table';
  capacity: Scalars['Float'];
  id: Scalars['ID'];
  number: Scalars['Float'];
  restaurant: Restaurant;
  ticket?: Maybe<Array<Ticket>>;
};

export type Ticket = {
  __typename?: 'Ticket';
  closedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  deliveredAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  number: Scalars['Float'];
  phoneNumber?: Maybe<Scalars['String']>;
  placedAt?: Maybe<Scalars['DateTime']>;
  restaurant: Restaurant;
  seats: Scalars['Float'];
  table?: Maybe<Table>;
};

export type GetRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRestaurantsQuery = { __typename?: 'Query', getRestaurants: Array<{ __typename?: 'Restaurant', id: string, name: string }> };


export const GetRestaurantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRestaurants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRestaurants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetRestaurantsQuery, GetRestaurantsQueryVariables>;