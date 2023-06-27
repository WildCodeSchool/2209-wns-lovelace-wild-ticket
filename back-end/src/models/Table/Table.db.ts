import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Table from "./Table.entity";
import Restaurant from "../Restaurant/Restaurant.entity";
import { TableFixtures } from "../../DataFixtures/TableFixtures";
import RestaurantRepository from "../Restaurant/Restaurant.repository";

export default class TableDb {
  protected static repository: Repository<Table>;
  public static async initializeRepository() {
    this.repository = await getRepository(Table);
  }

  public static async initializeTables(
    TableFixtures: TableFixtures[]
  ): Promise<void> {
    await Promise.all(
      TableFixtures.map(async (table) => {
        const restaurant = (await RestaurantRepository.getRestaurantByName(
          table.restaurant
        )) as Restaurant;

        const newTable = new Table(table.number, table.capacity, restaurant);

        await this.repository.save(newTable);
      })
    );
  }

  public static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }

  public static async getTableByNumber(
    number: number,
    restaurant: Restaurant
  ): Promise<Table | null> {
    return this.repository.findOneBy({ number, restaurant });
  }
}
