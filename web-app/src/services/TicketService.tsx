import { GET_TICKETS_BY_RESTAURANT_TYPES } from "../types/DataTypes";
import DateService from "./DateService";

export default class TicketService {
  static getCountOfWaitingTickets(
    tickets: GET_TICKETS_BY_RESTAURANT_TYPES,
    notComingTicketDisapearDelay: number
  ): number {
    const waitingTickets = tickets?.filter(
      (ticket) =>
        ticket.placedAt === null &&
        ((ticket.deliveredAt !== null &&
          DateService.addMinutesToDate(
            new Date(ticket.closedAt),
            notComingTicketDisapearDelay
          ) > new Date()) ||
          ticket.closedAt === null)
    );

    return waitingTickets?.length ?? 0;
  }
}
