import Ticket from "../models/Ticket/Ticket.entity";
import DateUpdates from "./DateUpdates";

export default class StatsService {
  static countTodaysTicketsBySeat = async (
    tickets: Ticket[]
  ): Promise<number[]> => {
    const today = DateUpdates.newDateAtMidnight().getTime() / 1000;
    const tomorrow = today + 86400;
    const todaysTickets = tickets?.filter(
      (ticket) =>
        new Date(ticket.createdAt).getTime() / 1000 > today &&
        new Date(ticket.createdAt).getTime() / 1000 < tomorrow
    ) as Ticket[];
    const seats = [2, 4, 6, 8];
    const groupTickets: number[] = [];
    seats.forEach((seat) => {
      const filteredTickets = todaysTickets?.filter(
        (ticket) => ticket.seats === seat - 1 || ticket.seats === seat
      );
      filteredTickets
        ? groupTickets.push(filteredTickets.length)
        : groupTickets.push(0);
    });
    return groupTickets;
  };

  static countCurrentWeekTickets = async (
    tickets: Ticket[]
  ): Promise<number[]> => {
    const today = DateUpdates.newDateAtMidnight();
    const dayToday = today.getDay();
    let firstDayWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - dayToday + 1
    );
    if (dayToday === 0) {
      firstDayWeek.setDate(firstDayWeek.getDate() - 7);
    }

    const groupTickets: number[] = [];

    for (let i = 0; i < 7; i++) {
      const day = firstDayWeek.getTime() / 1000;
      firstDayWeek.setDate(firstDayWeek.getDate() + 1);
      const dayAfter = firstDayWeek.getTime() / 1000;

      const filteredTickets = tickets.filter((ticket) => {
        const ticketTime = new Date(ticket.createdAt).getTime() / 1000;
        return ticketTime > day && ticketTime < dayAfter;
      });

      groupTickets.push(filteredTickets.length);
    }

    return groupTickets;
  };

  static countLastThirtyDaysTickets = async (
    tickets: Ticket[]
  ): Promise<number[]> => {
    const today = DateUpdates.newDateAtMidnight();
    let firstDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 29
    );

    const groupTickets: number[] = [];

    for (let i = 0; i < 30; i++) {
      const day = firstDay.getTime() / 1000;
      firstDay.setDate(firstDay.getDate() + 1);
      const dayAfter = firstDay.getTime() / 1000;

      const filteredTickets = tickets.filter((ticket) => {
        const ticketTime = new Date(ticket.createdAt).getTime() / 1000;
        return ticketTime > day && ticketTime < dayAfter;
      });

      groupTickets.push(filteredTickets.length);
    }

    return groupTickets;
  };
}
