import { Arg, Authorized, Query } from "type-graphql";
import Stats from "../../models/Stats/Stats.entity";
import StatsRepository from "../../models/Stats/Stats.repository";

export default class StatsResolver {
  @Authorized("ROLE_RESTAURANT")
  @Query(() => Stats)
  StatsByRestaurant(
    @Arg("restaurantId") restaurantId: string
  ): Promise<Stats | null> {
    return StatsRepository.getTicketStatsByRestaurantId(restaurantId);
  }
}
