import { getRepository } from "../../database/utils";
import Table from "./Table.entity";
import TableDb from "./Table.db";

export default class TableRepository extends TableDb {
  static async initializeRepository() {
    this.repository = await getRepository(Table);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async getTables(): Promise<Table[]> {
    return this.repository.find();
  }

  static async getTableByNumber(number: number): Promise<Table | null> {
    return this.repository.findOneBy({ number: number });
  }

  static async getTableById(id: string): Promise<Table | null> {
    return this.repository.findOneBy({ id });
  }

  static async createTable(
    number: number,
    capacity:  number
  ): Promise<Table> {
    const newTable = this.repository.create({ number, capacity });
    await this.repository.save(newTable);
    return newTable;
  }

  static async updateTable(
    id: string,
    number: number,
    capacity:  number
  ): Promise<
    {
      id: string;
      number: number,
      capacity:  number
    } & Table
  > {
    const existingTable = await this.repository.findOneBy({ id });
    if (!existingTable) {
      throw Error("No existing Table matching ID.");
    }
    return this.repository.save({
      id,
      number,
      capacity,
    });
  }

  static async deleteTable(id: string): Promise<Table> {
    const existingTable = await this.findTableById(id);
    if (!existingTable) {
      throw Error("No existing Table matching ID.");
    }
    await this.repository.remove(existingTable);
    existingTable.id = id;
    return existingTable;
  }
}
