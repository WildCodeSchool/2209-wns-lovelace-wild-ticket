import Table from "./Table.entity";
import TableDb from "./Table.db";
import Restaurant from "../Restaurant/Restaurant.entity";
import RestaurantRepository from "../Restaurant/Restaurant.repository";

export default class TableRepository extends TableDb {
  public static async getTables(): Promise<Table[]> {
    return this.repository.find();
  }

  public static async getTablesByRestaurant(
    restaurantId: string,
    capacity: number
  ): Promise<Table[] | null> {
    await RestaurantRepository.getRestaurantById(restaurantId);
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

  public static async getTableById(id: string): Promise<Table | null> {
    const table = await this.repository.findOneBy({ id });

    if (!table) {
      throw new Error("Aucune table ne correspond à cet ID.");
    }

    return table;
  }

  public static async createTable(
    number: number,
    capacity: number,
    restaurantId: string
  ): Promise<Table> {
    const restaurant = (await RestaurantRepository.getRestaurantById(
      restaurantId
    )) as Restaurant;

    const newTable = new Table(number, capacity, restaurant);

    await this.repository.save(newTable);

    return newTable;
  }

  public static async updateTable(
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
    (await this.getTableById(id)) as Table;

    return this.repository.save({
      id,
      number,
      capacity,
    });
  }

  public static async deleteTable(id: string): Promise<Table> {
    const table = (await this.getTableById(id)) as Table;

    await this.repository.remove(table);

    table.id = id;

    return table;
  }
}
