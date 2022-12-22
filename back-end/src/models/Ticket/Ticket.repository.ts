import { getRepository } from "../../database/utils";
import TicketDb from "./Ticket.db";
import Ticket from "./Ticket.entity";

export default class TicketRepository extends TicketDb {
  static async initializeRepository() {
    this.repository = await getRepository(Ticket);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async initializeTicket() {
    this.clearRepository();
    await this.repository.save({
      number: 0,
    });
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
    return this.repository.findOne({ order: { id: "DESC" } });
  }

  static async createTicket(
    name: string,
    email: string,
    phoneNumber: string
  ): Promise<Ticket> {
    const lastTicket = await this.getLastTicket() as Ticket;
    const ticketNumber = lastTicket.number + 1;
    const createdAt = new Date();
    const newTicket = new Ticket(
      ticketNumber,
      name,
      email,
      phoneNumber,
      createdAt
    );
    await this.repository.save(newTicket);
    return newTicket;
  }

  static async updateDeliveredAt (
    id: string,
  ): Promise<
    {
      id: string;
    } & Ticket
  > {
    const existingTicket = await this.repository.findOneBy({ id });
    const deliveredAt = new Date();
    if (!existingTicket) {
      throw Error("No existing Ticket matching ID.");
    }
    return this.repository.save({
      id,
      deliveredAt
    });
  }

  static async updatePlacedAt (
    id: string,
  ): Promise<
    {
      id: string;
    } & Ticket
  > {
    const existingTicket = await this.repository.findOneBy({ id });
    const placedAt = new Date();
    if (!existingTicket) {
      throw Error("No existing Ticket matching ID.");
    }
    return this.repository.save({
      id,
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
