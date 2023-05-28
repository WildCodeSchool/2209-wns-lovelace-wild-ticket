import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKETS_BY_RESTAURANT_TYPES,
} from "../types/DataTypes";

export default class TableService {
  static getEmptyTables(
    tickets: GET_TICKETS_BY_RESTAURANT_TYPES,
    tables: GET_TABLES_BY_RESTAURANT_TYPES
  ): GET_TABLES_BY_RESTAURANT_TYPES {
    const placedTickets = tickets
      ?.filter((ticket) => new Date(ticket.closedAt) > new Date())
      .map((ticket) => ticket.table?.number);

    const emptyTables = tables?.filter(
      (table) => !placedTickets?.includes(table.number)
    );

    return emptyTables || [];
  }
}
