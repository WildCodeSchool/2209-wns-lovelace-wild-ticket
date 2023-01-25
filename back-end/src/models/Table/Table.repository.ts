import { getRepository } from "../../database/utils";
import Table from "./Table.entity";
import TableDb from "./Table.db";
import Restaurant from "../Restaurant/Restaurant.entity";
import RestaurantRepository from "../Restaurant/Restaurant.repository";

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

  static async getTablesByRestaurant(id: string ): Promise<Table[] | null> {
    const restaurant = await RestaurantRepository.getRestaurantById(id);
    if (!restaurant) throw new Error;
    return await this.repository.findBy({restaurant});
  }

  static async getTableById(id: string): Promise<Table | null> {
    return this.repository.findOneBy({ id });
  }

  static async createTable(
    number: number,
    capacity:  number,
    restaurantId: string,
  ): Promise<Table> {
    const restaurant = await RestaurantRepository.getRestaurantById(restaurantId) as Restaurant;
    if (!restaurant) throw new Error;
    const newTable = new Table(number, capacity, restaurant);
    await this.repository.save(newTable);
    return newTable;
  }

  static async updateTable(
    id: string,
    number: number,
    capacity:  number,
    restaurantId: string,
  ): Promise<
    {
      id: string;
      number: number,
      capacity:  number,
      restaurant: Restaurant,
    } & Table
  > {
    const existingTable = await this.repository.findOneBy({ id });
    const restaurant = await RestaurantRepository.getRestaurantById(restaurantId) as Restaurant;
    if (!existingTable || !restaurant) {
      throw Error("No existing Table matching ID or restaurant");
    }
    return this.repository.save({
      id,
      number,
      capacity,
      restaurant
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
