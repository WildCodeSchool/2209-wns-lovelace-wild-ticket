import { Repository } from "typeorm";
import Restaurant from "./Restaurant.entity";
import { getRepository } from "../../database/utils";
import Pole from "../Pole/Pole.entity";
import PoleRepository from "../Pole/Pole.repository";
import RestaurantDb from "./Restaurant.db";

export default class RestaurantRepository extends RestaurantDb {
  static async initializeRestaurants(): Promise<void> {
    await this.clearRepository();
    const lyonPole = (await PoleRepository.getPoleByName(
      "Lyon"
    )) as Pole;
    const pizzaMinute = new Restaurant("PizzaMinute", lyonPole);
    const lardonaise = new Restaurant("Lardonaise", lyonPole);

    await this.repository.save([pizzaMinute, lardonaise]);
  }

  static async getRestaurants(): Promise<Restaurant[]> {
    return this.repository.find();
  }

  static async createRestaurant(
    name: string
  ): Promise<Restaurant> {
    const newRestaurant = this.repository.create({ name });
    await this.repository.save(newRestaurant);
    return newRestaurant;
  }

  static async updateRestaurant(
    id: string,
    name: string
  ): Promise<
    {
      id: string;
      name: string;
    } & Restaurant
  > {
    const existingRestaurant = await this.repository.findOneBy({ id });
    if (!existingRestaurant) {
      throw Error("No existing Restaurant matching ID.");
    }
    return this.repository.save({
      id,
      name,
    });
  }

  static async deleteRestaurant(id: string): Promise<Restaurant> {
    const existingRestaurant = await this.findRestaurantById(id);
    if (!existingRestaurant) {
      throw Error("No existing Restaurant matching ID.");
    }
    await this.repository.remove(existingRestaurant);
    // resetting ID because existingRestaurant loses ID after calling remove
    existingRestaurant.id = id;
    return existingRestaurant;
  }
}
