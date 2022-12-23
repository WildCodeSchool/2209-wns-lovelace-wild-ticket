import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Restaurant from "./Restaurant.entity";

export default class RestaurantDb {
  protected static repository: Repository<Restaurant>;
  static async initializeRepository() {
    this.repository = await getRepository(Restaurant);
  }

  protected static findRestaurantById(restaurantId: string) {
    return this.repository.findOneBy({ id: restaurantId });
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }
}
