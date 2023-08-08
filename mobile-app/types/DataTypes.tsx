export type RESTAURANT_TYPE = {
  __typename?: "Restaurant" | undefined;
  id: string;
  name: string;
  openAt?: any;
  closeAt?: any;
  picture?: string | null | undefined;
  ticketWaitingLimit?: number | null | undefined;
};

export type GET_TICKETS_BY_RESTAURANT_TYPES = Array<{
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
    | null
    | undefined;
}> | null;

export type GET_TABLES_BY_RESTAURANT_TYPES = Array<{
  __typename?: "Table";
  id: string;
  number: number;
  capacity: number;
}> | null;
