
import { getRepository } from "../../database/utils";
import Restaurant from "../Restaurant/Restaurant.entity";
import RestaurantRepository from "../Restaurant/Restaurant.repository";
import Table from "../Table/Table.entity";
import TableRepository from "../Table/Table.repository";
import TicketDb from "./Ticket.db";
import Ticket from "./Ticket.entity";

export default class TicketRepository extends TicketDb {
  static async initializeRepository() {
    this.repository = await getRepository(Ticket);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async getTickets(): Promise<Ticket[]> {
    return this.repository.find();
  }

  static async getTicketByNumber(number: number): Promise<Ticket | null> {
    return this.repository.findOneBy({ number: number });
  }

  static async getTicketById(id: string): Promise<Ticket | null> {
    return this.repository.findOneBy({ id });
  }

  static async getLastTicket(): Promise<Ticket | null> {
    return this.repository.findOne({ where: {}, order: { createdAt: "DESC" }});
  }

  static async createTicket(
    name: string,
    restaurantId: string,
    email: string | undefined,
    phoneNumber: string | undefined
  ): Promise<Ticket> {
    const restaurant = await RestaurantRepository.getRestaurantById(restaurantId) as Restaurant;
    if (!restaurant) throw new Error;

    const lastTicket = await this.getLastTicket();
    let ticketNumber = 1;
    (lastTicket && lastTicket.number < 10) ? ticketNumber = lastTicket.number + 1 : ticketNumber;
    const createdAt = new Date();
    const newTicket = new Ticket(
      ticketNumber,
      name,
      createdAt,
      restaurant,
      email,
      phoneNumber,
    );
    await this.repository.save(newTicket);
    return newTicket;
  }

  static async updateDeliveredAt (
    id: string,
    tableId: string,
  ): Promise<
    {
      id: string;
      table: Table;
    } & Ticket
  > {
    const existingTicket = await this.repository.findOneBy({ id });
    const table = await TableRepository.getTableById(tableId) as Table;
    const deliveredAt = new Date();
    if (!existingTicket) {
      throw Error("No existing Ticket matching ID.");
    }
    return this.repository.save({
      id,
      table,
      deliveredAt
    });
  }

  static async updatePlacedAt (
    id: string,
    tableId: string,
  ): Promise<
    {
      id: string;
      table: Table;
    } & Ticket
  > {
    const existingTicket = await this.repository.findOneBy({ id });
    const table = await TableRepository.getTableById(tableId) as Table;
    const placedAt = new Date();
    if (!existingTicket) {
      throw Error("No existing Ticket matching ID.");
    }
    if (!table) {
      throw Error("No existing table matching ID.");
    }
    return this.repository.save({
      id,
      table,
      placedAt
    });
  }

  static async updateClosedAt (
    id: string,
  ): Promise<
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
      closedAt
    });
  }
}
