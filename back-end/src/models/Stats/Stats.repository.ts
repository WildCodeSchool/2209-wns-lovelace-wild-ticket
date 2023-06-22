import DateUpdates from "../../services/DateUpdates";
import StatsService from "../../services/StatsService";
import TicketRepository from "../Ticket/Ticket.repository";
import Stats from "./Stats.entity";

export default class StatsRepository {
  static async getTicketStatsByRestaurantId(
    restaurantId: string
  ): Promise<Stats | null> {
    const tickets = await TicketRepository.getTicketsByRestaurant(
      restaurantId,
      null
    );

    if (!tickets) {
      return null;
    }

    const tableCapacity = ["2", "4", "6", "8"];
    const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    const lastThirtyDays = DateUpdates.lastThirtyDays();
    const countTicketsBySeat = await StatsService.countTodaysTicketsBySeat(
      tickets
    );
    const countActualWeekTickets = await StatsService.countCurrentWeekTickets(
      tickets
    );
    const countOfLastThirtyDaysTickets =
      await StatsService.countLastThirtyDaysTickets(tickets);

    return new Stats(
      tableCapacity,
      countTicketsBySeat,
      daysOfWeek,
      countActualWeekTickets,
      lastThirtyDays,
      countOfLastThirtyDaysTickets
    );
  }
}
