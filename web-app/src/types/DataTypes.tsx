export type GET_TICKETS_BY_RESTAURANT_TYPES = Array<{
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
  table?: {
    __typename?: "Table";
    id: string;
    number: number;
  } | null;
}> | null;

export type GET_TICKET_BY_RESTAURANT_TYPES = {
  __typename?: "Ticket" | undefined;
  id: string;
  number: string;
  name: string;
  seats: number;
  email?: string | null;
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

export type GET_POLE_TYPES = {
  __typename?: "Pole" | undefined;
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
} | null;

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

export type EXPORT_TICKETS_BY_RESTAURANT_TYPES = Array<{
  __typename?: "Ticket" | undefined;
  number: string;
  name: string;
  email?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  seats: number;
  createdAt: any;
  deliveredAt?: any;
  placedAt?: any;
  closedAt?: any;
}> | null;

export type EXPORT_TICKETS_BY_RESTAURANT_TYPES_NOT_NULL = Array<{
  __typename?: "Ticket" | undefined;
  number: string;
  name: string;
  email?: string | null | undefined;
  phoneNumber?: string | null | undefined;
  seats: number;
  createdAt: any;
  deliveredAt?: any;
  placedAt?: any;
  closedAt?: any;
}>;

export type GET_PAGINATED_AND_SORTED_TICKETS_BY_RESTAURANT_TYPES = {
  __typename?: "PageOfTickets" | undefined;
  totalCount: number;
  nextPageNumber?: number | null | undefined;
  tickets: {
    __typename?: "Ticket" | undefined;
    number: string;
    name: string;
    seats: number;
    createdAt: any;
    deliveredAt?: any;
    placedAt?: any;
    closedAt?: any;
  }[];
} | null;

export type DATA_TABLE_LAZY_STATE_TYPES = {
  globalFilter: string;
  first: number;
  rows: number;
  page: number;
  sortField: string[];
  sortOrder: number[];
};
