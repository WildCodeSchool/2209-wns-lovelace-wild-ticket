export type GET_TICKETS_BY_RESTAURANT_TYPES = Array<{
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
  table?: {
    __typename?: "Table";
    id: string;
    number: number;
  } | null;
}> | null;

export type GET_TICKET_BY_RESTAURANT_TYPES = {
  __typename?: "Ticket" | undefined;
  id: string;
  number: number;
  name: string;
  seats: number;
  email: string;
  phoneNumber?: string | null | undefined;
  createdAt: any;
  deliveredAt?: any | null;
  placedAt?: any | null;
  closedAt?: any | null;
  table?:
    | {
        __typename?: "Table" | undefined;
        id: string;
        number: number;
      }
    | null
    | undefined;
} | null;

export type GET_TABLES_BY_RESTAURANT_TYPES = Array<{
  __typename?: "Table";
  id: string;
  number: number;
  capacity: number;
}> | null;

export type GET_POLES_TYPES = Array<{
  __typename?: "Pole";
  id: string;
  name: string;
  address: string;
  zipCode: string;
  city: string;
  email: string;
  restaurant?:
    | Array<{
        __typename?: "Restaurant";
        id: string;
        name: string;
      }>
    | null
    | undefined;
}> | null;

export type GET_RESTAURANTS_TYPES = Array<{
  __typename?: "Restaurant";
  id: string;
  name: string;
  pole?: {
    __typename?: "Pole";
    id: string;
    name: string;
    address: string;
    zipCode: string;
    city: string;
    email: string;
  };
}> | null;
