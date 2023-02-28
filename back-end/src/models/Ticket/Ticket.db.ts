import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Ticket from "./Ticket.entity";

export default class TicketDb {
  protected static repository: Repository<Ticket>;
  static async initializeRepository() {
    this.repository = await getRepository(Ticket);
  }

  protected static findTicketById(TicketId: string) {
    return this.repository.findOneBy({ id: TicketId });
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});  }
}