import { TICKET_DISAPPEAR_DELAY } from "../constants/Constants";
import { GET_TICKETS_BY_RESTAURANT_TYPES } from "../types/DataTypes";
import { addMinutesToDate } from "./DateService";

export default class TicketService {
  static getCountOfWaitingTickets(
    tickets: GET_TICKETS_BY_RESTAURANT_TYPES
  ): number {
    const waitingTickets = tickets?.filter(
      (ticket) =>
        ticket.placedAt === null &&
        ((ticket.deliveredAt !== null &&
          addMinutesToDate(new Date(ticket.closedAt), TICKET_DISAPPEAR_DELAY) >
            new Date()) ||
          ticket.closedAt === null)
    );

    return waitingTickets?.length ?? 0;
  }
}
