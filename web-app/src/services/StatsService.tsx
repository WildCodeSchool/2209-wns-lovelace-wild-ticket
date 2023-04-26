/* eslint-disable no-loop-func */
import { GET_TICKETS_BY_RESTAURANT_TYPES } from "../types/DataTypes";
import { newDateAtMidnight } from "./DateService";

export const lastThirtyDays = () => {
  const dates = [];
  const aujourdHui = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(
      aujourdHui.getFullYear(),
      aujourdHui.getMonth(),
      aujourdHui.getDate() - i
    );
    const jour = date.getDate();
    const mois = date.getMonth() + 1;
    const jourMois = jour.toString() + "/" + mois.toString();
    dates.unshift(jourMois);
  }
  return dates;
};

export const countTodaysTicketsBySeat = (
  tickets: GET_TICKETS_BY_RESTAURANT_TYPES
): number[] => {
  const today = newDateAtMidnight().getTime() / 1000;
  const tomorrow = today + 86400;
  const todaysTickets = tickets?.filter(
    (ticket) =>
      new Date(ticket.createdAt).getTime() / 1000 > today &&
      new Date(ticket.createdAt).getTime() / 1000 < tomorrow
  ) as GET_TICKETS_BY_RESTAURANT_TYPES;
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

export const countCurrentWeekTickets = (
  tickets: GET_TICKETS_BY_RESTAURANT_TYPES
): any => {
  const today = newDateAtMidnight();
  const dayToday = today.getDay();
  let firstDayWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - dayToday + 1
  );
  if (dayToday === 0) {
    firstDayWeek.setDate(firstDayWeek.getDate() - 7);
  }

  let day = firstDayWeek.getTime() / 1000;
  let dayAfter = firstDayWeek.setDate(firstDayWeek.getDate() + 1);
  dayAfter /= 1000;

  const groupTickets: number[] = [];

  for (let i = 0; i <= 7; i++) {
    const filteredTickets = tickets?.filter(
      (ticket) =>
        new Date(ticket.createdAt).getTime() / 1000 > day &&
        new Date(ticket.createdAt).getTime() / 1000 < dayAfter
    );
    filteredTickets
      ? groupTickets.push(filteredTickets.length)
      : groupTickets.push(0);

    day = dayAfter;
    dayAfter = firstDayWeek.setDate(firstDayWeek.getDate() + 1);
    dayAfter /= 1000;
  }
  return groupTickets;
};

export const countLastThirtyDaysTickets = (
  tickets: GET_TICKETS_BY_RESTAURANT_TYPES
): any => {
  const today = newDateAtMidnight();
  let firstDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 29
  );

  let day = firstDay.getTime() / 1000;
  let dayAfter = firstDay.setDate(firstDay.getDate() + 1);
  dayAfter /= 1000;

  const groupTickets: number[] = [];

  for (let i = 0; i <= 29; i++) {
    const filteredTickets = tickets?.filter(
      (ticket) =>
        new Date(ticket.createdAt).getTime() / 1000 > day &&
        new Date(ticket.createdAt).getTime() / 1000 < dayAfter
    );
    filteredTickets
      ? groupTickets.push(filteredTickets.length)
      : groupTickets.push(0);

    day = dayAfter;
    dayAfter = firstDay.setDate(firstDay.getDate() + 1);
    dayAfter /= 1000;
  }

  return groupTickets;
};
