import { GET_TICKETS_BY_RESTAURANT_TYPES } from "../types/DataTypes";
import { newDateAtMidnight } from "./DateService";

const frenchMonth = (month: number): string => {
  const moisEnFrancais = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  return moisEnFrancais[month];
}

export const lastThirtyDays = () => {
  const dates = [];
  const aujourdHui = new Date();
  let datePrecedente = null;
  for (let i = 0; i < 30; i++) {
    const date = new Date(aujourdHui.getFullYear(), aujourdHui.getMonth(), aujourdHui.getDate() - i);
    const jour = date.getDate();
    const mois = date.getMonth();
    if (datePrecedente === null || mois !== datePrecedente.getMonth()) {
      const jourMois = jour.toString();
      dates.unshift({jour, jourMois});
    } else {
      const jourMois = (jour === 1 ? "1er " + frenchMonth(mois) : jour.toString());
      dates.unshift({jour, jourMois});
    }
    datePrecedente = date;
  }
  return dates;
}

export const countTodaysTicketsBySeat = (tickets: GET_TICKETS_BY_RESTAURANT_TYPES): number[] => {
  const todaysTickets = tickets?.filter(
    (ticket) => new Date(ticket.createdAt) > newDateAtMidnight()
  ) as GET_TICKETS_BY_RESTAURANT_TYPES;
  const seats = [2, 4, 6, 8];
  const groupTickets: number[] = [];
  seats.forEach((seat) => {
    const filteredTickets = todaysTickets?.filter(
      (ticket) => ticket.seats === seat
    );
    filteredTickets
      ? groupTickets.push(filteredTickets.length)
      : groupTickets.push(0);
  });
  return groupTickets;
};