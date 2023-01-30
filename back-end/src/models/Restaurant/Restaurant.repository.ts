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
    const pole = (await PoleRepository.getPoleById(idPole)) as Pole;

    if (!pole) {
      throw new Error("Aucun pôle ne correspond à cet ID.");
    }

    const createdAt = new Date();

    const openAt = DateUpdates.updateOpenedClosedHoursRestaurant(11, 0o0);
    const closeAt = DateUpdates.updateOpenedClosedHoursRestaurant(23, 30);

    const newRestaurant = new Restaurant(
      name,
      pole,
      createdAt,
      undefined,
      openAt,
      closeAt
    );
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
      throw new Error("Aucun restaurant ne correspond à cet ID.");
    }

    const updatedAt = new Date();

    return this.repository.save({
      id,
      name,
      updatedAt: updatedAt,
    });
  }

  static async updateRestaurantOpeningTime(
    id: string,
    hourOpenAt: number,
    minutesOpenAt: number,
    hourCloseAt: number,
    minutesCloseAt: number
  ): Promise<
    {
      id: string;
      openAt: Date;
      closeAt: Date;
    } & Restaurant
  > {
    const existingRestaurant = await this.repository.findOneBy({ id });

    if (!existingRestaurant) {
      throw new Error("Aucun restaurant ne correspond à cet ID.");
    }

    const updatedAt = new Date();

    const openAt = DateUpdates.updateOpenedClosedHoursRestaurant(
      hourOpenAt,
      minutesOpenAt
    );
    const closeAt = DateUpdates.updateOpenedClosedHoursRestaurant(
      hourCloseAt,
      minutesCloseAt
    );

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
      throw new Error("Aucun restaurant ne correspond à cet ID.");
    }

    await this.repository.remove(existingRestaurant);

    // resetting ID because existingRestaurant loses ID after calling remove
    existingRestaurant.id = id;

    return existingRestaurant;
  }
}
