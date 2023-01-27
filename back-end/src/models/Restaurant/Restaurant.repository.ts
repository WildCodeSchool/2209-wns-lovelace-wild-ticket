import Restaurant from "./Restaurant.entity";
import Pole from "../Pole/Pole.entity";
import PoleRepository from "../Pole/Pole.repository";
import RestaurantDb from "./Restaurant.db";
import RestaurantFixtures, {
  RestaurantFixturesType,
} from "../../DataFixtures/RestaurantFixtures";
import DateUpdates from "../../services/DateUpdates";

export default class RestaurantRepository extends RestaurantDb {
  static async initializeRestaurants(): Promise<void> {
    const lyonPole = (await PoleRepository.getPoleByName(
      "Pôle de Lyon"
    )) as Pole;
    const restaurantFixtures: RestaurantFixturesType[] =
      await RestaurantFixtures.getRestaurants();

    await Promise.all(
      restaurantFixtures.map(async (restaurant) => {
        const newRestaurant = new Restaurant(
          restaurant.name,
          lyonPole,
          restaurant.createdAt,
          undefined,
          restaurant.openAt,
          restaurant.closeAt
        );

        await this.repository.save(newRestaurant);
      })
    );
  }

  static async getRestaurants(): Promise<Restaurant[]> {
    return this.repository.find();
  }

  static async getRestaurantById(id: string): Promise<Restaurant | null> {
    return this.repository.findOneBy({ id: id });
  }

  static async getRestaurantByName(name: string): Promise<Restaurant | null> {
    return this.repository.findOneBy({ name: name });
  }

  static async createRestaurant(
    name: string,
    idPole: string
  ): Promise<Restaurant> {
    const createdAt = new Date();
    const pole = (await PoleRepository.getPoleById(idPole)) as Pole;
    const openAt = DateUpdates.updateOpenedClosedHoursRestaurant(11, 0o0);
    const closeAt = DateUpdates.updateOpenedClosedHoursRestaurant(23, 30);
    const newRestaurant = new Restaurant(name, pole, createdAt, undefined, openAt, closeAt);
    await this.repository.save(newRestaurant);
    return newRestaurant;
  }

  static async updateRestaurantName(
    id: string,
    name: string,
    pole: string,
  ): Promise<
    {
      id: string;
      name: string;
      pole: Pole;
    } & Restaurant
  > {
    const existingRestaurant = await this.repository.findOneBy({ id });
    const updatedPole = (await PoleRepository.getPoleById(pole)) as Pole;
    const updatedAt = new Date();
    if (!existingRestaurant) {
      throw Error("No existing Restaurant matching ID.");
    }
    if (!updatedPole) {
      throw Error("No existing Pole matching ID.");
    }
    return this.repository.save({
      id,
      name,
      pole: updatedPole,
      updatedAt: updatedAt,
    });
  }

  static async updateRestaurantOpeningTime(
    id: string,
    hourOpenAt: number,
    minutesOpenAt: number,
    hourCloseAt: number,
    minutesCloseAt: number,
  ): Promise<
    {
      id: string;
      openAt: Date;
      closeAt: Date;
    } & Restaurant
  > {
    const existingRestaurant = await this.repository.findOneBy({ id });
    const updatedAt = new Date();
    if (!existingRestaurant) {
      throw Error("No existing Restaurant matching ID.");
    }
    const openAt = DateUpdates.updateOpenedClosedHoursRestaurant(hourOpenAt, minutesOpenAt);
    const closeAt = DateUpdates.updateOpenedClosedHoursRestaurant(hourCloseAt, minutesCloseAt);
    return this.repository.save({
      id,
      updatedAt: updatedAt,
      openAt,
      closeAt,
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
