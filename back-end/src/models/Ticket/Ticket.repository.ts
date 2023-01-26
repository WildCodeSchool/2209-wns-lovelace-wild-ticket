import TicketFixtures, {
  TicketFixturesType,
} from "../../DataFixtures/TicketFixtures";
import DateUpdates from "../../services/DateUpdates";
import Restaurant from "../Restaurant/Restaurant.entity";
import RestaurantRepository from "../Restaurant/Restaurant.repository";
import Table from "../Table/Table.entity";
import TableRepository from "../Table/Table.repository";
import TicketDb from "./Ticket.db";
import Ticket from "./Ticket.entity";

export default class TicketRepository extends TicketDb {
  static async initializeTickets(): Promise<void> {
    const restaurants =
      (await RestaurantRepository.getRestaurants()) as Restaurant[];

    for (const restaurant of restaurants) {
      const ticketsFixtures: TicketFixturesType[] =
        await TicketFixtures.getRandomTickets();
      await Promise.all(
        ticketsFixtures.map(async (ticket) => {
          const table = (await TableRepository.getTableByNumber(
            ticket.table,
            restaurant
          )) as Table;

          const newTicket = new Ticket(
            ticket.number,
            ticket.name,
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

  static async getTickets(): Promise<Ticket[]> {
    return this.repository.find();
  }

  static async getTicketByNumber(number: number): Promise<Ticket | null> {
    return this.repository.findOneBy({ number: number });
  }

  static async getTicketsByRestaurant(id: string): Promise<Ticket[] | null> {
    const restaurant = await RestaurantRepository.getRestaurantById(id);
    if (!restaurant) throw new Error();
    return await this.repository.findBy({ restaurant });
  }

  static async getTicketById(id: string): Promise<Ticket | null> {
    return this.repository.findOneBy({ id });
  }

  static async getLastTicket(): Promise<Ticket | null> {
    return this.repository.findOne({ where: {}, order: { createdAt: "DESC" } });
  }

  static async createTicket(
    name: string,
    restaurantId: string,
    email: string | undefined,
    phoneNumber: string | undefined
  ): Promise<Ticket> {
    const restaurant = (await RestaurantRepository.getRestaurantById(
      restaurantId
    )) as Restaurant;
    if (!restaurant) throw new Error();

    const lastTicket = await this.getLastTicket();
    let ticketNumber = 1;
    lastTicket && lastTicket.number < 10
      ? (ticketNumber = lastTicket.number + 1)
      : ticketNumber;
    const createdAt = new Date();
    const newTicket = new Ticket(
      ticketNumber,
      name,
      createdAt,
      restaurant,
      email,
      phoneNumber
    );
    await this.repository.save(newTicket);
    return newTicket;
  }

  static async updateDeliveredAt(
    id: string,
    tableId: string
  ): Promise<
    {
      id: string;
      table: Table;
    } & Ticket
  > {
    const existingTicket = await this.repository.findOneBy({ id });
    const table = (await TableRepository.getTableById(tableId)) as Table;
    const deliveredAt = new Date();
    const closedAt = DateUpdates.addMinutesToDate(deliveredAt, 15);

    if (!existingTicket) {
      throw Error("No existing Ticket matching ID.");
    }

    return this.repository.save({
      id,
      table,
      deliveredAt,
      closedAt,
    });
  }

  static async updatePlacedAt(
    id: string,
    tableId: string
  ): Promise<
    {
      id: string;
      table: Table;
    } & Ticket
  > {
    const existingTicket = await this.repository.findOneBy({ id });
    const table = (await TableRepository.getTableById(tableId)) as Table;
    const placedAt = new Date();
    const closedAt = undefined;
    if (!existingTicket) {
      throw Error("No existing Ticket matching ID.");
    }
    if (!table) {
      throw Error("No existing table matching ID.");
    }
    return this.repository.save({
      id,
      table,
      placedAt,
      closedAt,
    });
  }

  static async updateClosedAt(id: string): Promise<
    {
      id: string;
    } & Ticket
  > {
    const existingTicket = await this.repository.findOneBy({ id });
    const closedAt = new Date();
    if (!existingTicket) {
      throw Error("No existing Ticket matching ID.");
    }
    return this.repository.save({
      id,
      closedAt,
    });
  }
}
