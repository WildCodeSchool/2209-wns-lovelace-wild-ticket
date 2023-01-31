import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Table from "./Table.entity";

export default class TableDb {
  protected static repository: Repository<Table>;
  static async initializeRepository() {
    this.repository = await getRepository(Table);
  }

  protected static findTableById(tableId: string) {
    return this.repository.findOneBy({ id: tableId });
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});  }
}