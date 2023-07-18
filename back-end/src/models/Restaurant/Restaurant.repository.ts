import Restaurant from "./Restaurant.entity";
import Pole from "../Pole/Pole.entity";
import PoleRepository from "../Pole/Pole.repository";
import RestaurantDb from "./Restaurant.db";
import PageOfRestaurants from "../../resolvers/Restaurant/PageOfRestaurant";
import DateUpdates from "../../services/DateUpdates";
import TicketRepository from "../Ticket/Ticket.repository";

export default class RestaurantRepository extends RestaurantDb {
  public static async getRestaurants(): Promise<Restaurant[]> {
    return this.repository.find();
  }

  public static async getPaginateRestaurantsByPole(
    poleName: string,
    pageSize: number,
    pageNumber: number
  ): Promise<PageOfRestaurants> {
    const pole = (await PoleRepository.getPoleByName(poleName)) as Pole;

    const [restaurants, totalCount] = await this.repository.findAndCount({
      where: { pole: pole },
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
    });

    const numberOfRemainingItems = totalCount - pageSize * pageNumber;

    return {
      totalCount,
      nextPageNumber: numberOfRemainingItems > 0 ? pageNumber + 1 : null,
      restaurants,
    };
  }

  public static async getRestaurantById(
    id: string
  ): Promise<Restaurant | null> {
    const restaurant = await this.repository.findOneBy({ id: id });

    if (!restaurant) {
      throw new Error("Aucun restaurant ne correspond à cet ID.");
    }

    return restaurant;
  }

  public static async createRestaurant(
    name: string,
    picture: string | undefined,
    ticketWaitingLimit: number,
    notComingTicketDisapearDelay: number,
    idPole: string
  ): Promise<Restaurant> {
    const pole = (await PoleRepository.getPoleById(idPole)) as Pole;

    const createdAt = new Date();

    const openAt = DateUpdates.updateOpenedClosedHoursRestaurant(11, 0o0);
    const closeAt = DateUpdates.updateOpenedClosedHoursRestaurant(23, 30);

    const newRestaurant = new Restaurant(
      name,
      pole,
      createdAt,
      ticketWaitingLimit,
      notComingTicketDisapearDelay,
      undefined,
      openAt,
      closeAt,
      picture
    );
    await this.repository.save(newRestaurant);
    return newRestaurant;
  }

  public static async updateRestaurant(
    id: string,
    name: string,
    picture: string | undefined,
    ticketWaitingLimit: number,
    notComingTicketDisapearDelay: number
  ): Promise<
    {
      id: string;
      name: string;
    } & Restaurant
  > {
    const restaurant = (await this.getRestaurantById(id)) as Restaurant;

    const existingTicketWaitingLimit = restaurant.ticketWaitingLimit;
    const existingNotComingTicketDisapearDelay =
      restaurant.notComingTicketDisapearDelay;

    if (
      existingTicketWaitingLimit !== ticketWaitingLimit ||
      existingNotComingTicketDisapearDelay !== notComingTicketDisapearDelay
    ) {
      const countTodayTickets =
        await TicketRepository.getCountTicketsByRestaurantSinceMidnight(id);

      if (countTodayTickets && countTodayTickets > 0) {
        throw new Error(
          "Impossible de modifier ces délais en cours de journée."
        );
      }
    }

    const updatedAt = new Date();

    return this.repository.save({
      id,
      name,
      ticketWaitingLimit,
      notComingTicketDisapearDelay,
      updatedAt: updatedAt,
      picture,
    });
  }

  public static async updateRestaurantOpeningTime(
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
    await this.getRestaurantById(id);

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

  public static async deleteRestaurant(id: string): Promise<Restaurant> {
    const restaurant = (await this.getRestaurantById(id)) as Restaurant;

    await this.repository.remove(restaurant);

    // resetting ID because restaurant loses ID after calling remove
    restaurant.id = id;

    return restaurant;
  }
}
