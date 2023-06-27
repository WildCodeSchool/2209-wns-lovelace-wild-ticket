import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Restaurant from "./Restaurant.entity";
import PoleRepository from "../Pole/Pole.repository";
import RestaurantFixtures, {
  RestaurantFixturesType,
} from "../../DataFixtures/RestaurantFixtures";
import Pole from "../Pole/Pole.entity";

export default class RestaurantDb {
  protected static repository: Repository<Restaurant>;

  public static async initializeRepository() {
    this.repository = await getRepository(Restaurant);
  }

  public static async initializeRestaurants(): Promise<void> {
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
          restaurant.ticketWaitingLimit,
          restaurant.notComingTicketDisapearDelay,
          undefined,
          restaurant.openAt,
          restaurant.closeAt,
          restaurant.picture
        );

        await this.repository.save(newRestaurant);
      })
    );
  }

  public static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }

  public static async getRestaurantByName(
    name: string
  ): Promise<Restaurant | null> {
    return this.repository.findOneBy({ name: name });
  }
}
