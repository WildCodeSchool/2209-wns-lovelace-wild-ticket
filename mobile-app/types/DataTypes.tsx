export type RESTAURANT_TYPE = {
  __typename?: "Restaurant" | undefined;
  id: string;
  name: string;
  openAt?: any;
  closeAt?: any;
  picture: string;
};

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

export type GET_TABLES_BY_RESTAURANT_TYPES = Array<{
  __typename?: "Table";
  id: string;
  number: number;
  capacity: number;
}> | null;
