import Table from "./Table.entity";
import TableDb from "./Table.db";
import Restaurant from "../Restaurant/Restaurant.entity";
import RestaurantRepository from "../Restaurant/Restaurant.repository";
import { TableFixtures } from "../../DataFixtures/TableFixtures";

export default class TableRepository extends TableDb {
  static async initializeTables(TableFixtures: TableFixtures[]): Promise<void> {
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

  static async getTables(): Promise<Table[]> {
    return this.repository.find();
  }

  static async getTableByNumber(
    number: number,
    restaurant: Restaurant
  ): Promise<Table | null> {
    return this.repository.findOneBy({ number, restaurant });
  }

  static async getTablesByRestaurant(
    restaurantId: string,
    capacity: number
  ): Promise<Table[] | null> {
    const restaurant = await RestaurantRepository.getRestaurantById(
      restaurantId
    );
    if (!restaurant) throw new Error();
    let query = this.repository
      .createQueryBuilder("table")
      .leftJoinAndSelect("table.restaurant", "restaurant")
      .where("table.restaurant.id = :restaurantId", {
        restaurantId: restaurantId,
      });
    if (capacity as number) {
      query.andWhere("table.capacity = :tableCapacity", {
        tableCapacity: capacity,
      });
    }
    return await query.getMany();
  }

  static async getTableById(id: string): Promise<Table | null> {
    return this.repository.findOneBy({ id });
  }

  static async createTable(
    number: number,
    capacity: number,
    restaurantId: string
  ): Promise<Table> {
    const restaurant = (await RestaurantRepository.getRestaurantById(
      restaurantId
    )) as Restaurant;

    if (!restaurant) {
      throw new Error("Aucun restaurant ne correspond à cet ID.");
    }

    const newTable = new Table(number, capacity, restaurant);

    await this.repository.save(newTable);

    return newTable;
  }

  static async updateTable(
    id: string,
    number: number,
    capacity: number
  ): Promise<
    {
      id: string;
      number: number;
      capacity: number;
    } & Table
  > {
    const existingTable = await this.repository.findOneBy({ id });

    if (!existingTable) {
      throw new Error("Aucune table ne correspond à cet ID.");
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
      throw new Error("Aucune table ne correspond à cet ID.");
    }

    await this.repository.remove(existingTable);

    existingTable.id = id;

    return existingTable;
  }
}
