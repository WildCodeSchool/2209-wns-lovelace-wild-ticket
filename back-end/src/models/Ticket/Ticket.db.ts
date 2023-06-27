import { MoreThan, Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Ticket from "./Ticket.entity";
import Restaurant from "../Restaurant/Restaurant.entity";
import RestaurantRepository from "../Restaurant/Restaurant.repository";
import DateUpdates from "../../services/DateUpdates";
import TicketFixtures, {
  TicketFixturesType,
} from "../../DataFixtures/TicketFixtures";
import TableRepository from "../Table/Table.repository";
import Table from "../Table/Table.entity";
import TicketService from "../../services/TicketService";

export default class TicketDb {
  protected static repository: Repository<Ticket>;

  public static async initializeRepository() {
    this.repository = await getRepository(Ticket);
  }

  public static async initializeTickets(): Promise<void> {
    const restaurants =
      (await RestaurantRepository.getRestaurants()) as Restaurant[];

    for (const restaurant of restaurants) {
      const ticketsFixtures: TicketFixturesType[] =
        await TicketFixtures.getRandomTickets();
      await Promise.all(
        ticketsFixtures.map(async (ticket) => {
          const table = ticket.table
            ? ((await TableRepository.getTableByNumber(
                ticket.table,
                restaurant
              )) as Table)
            : undefined;

          const ticketNumber = TicketService.formatTicketNumberForFixtures(
            restaurant,
            ticket.number,
            ticket.createdAt
          );

          const newTicket = new Ticket(
            ticketNumber,
            ticket.name,
            ticket.seats,
            ticket.createdAt,
            restaurant,
            ticket.email,
            ticket.phoneNumber,
            table,
            ticket.deliveredAt,
            ticket.placedAt,
            ticket.closedAt
          );

          await this.repository.save(newTicket);
        })
      );
    }
  }

  public static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }

  public static async getCountTicketsByRestaurantSinceMidnight(
    restaurantId: string
  ): Promise<number> {
    const restaurant = await RestaurantRepository.getRestaurantById(
      restaurantId
    );
    if (!restaurant) throw new Error();
    const startOfDay = DateUpdates.newDateAtMidnight();
    return await this.repository.count({
      where: {
        restaurant: restaurant,
        createdAt: MoreThan(startOfDay),
      },
    });
  }

  protected static async getLastTicket(
    restaurant: Restaurant
  ): Promise<Ticket | null> {
    await RestaurantRepository.getRestaurantById(restaurant.id);

    return this.repository.findOne({
      where: { restaurant: restaurant },
      order: { createdAt: "DESC" },
    });
  }
}
