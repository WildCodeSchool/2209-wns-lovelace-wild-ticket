import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql";

import Restaurant from "../../models/Restaurant/Restaurant.entity";
import RestaurantRepository from "../../models/Restaurant/Restaurant.repository";
import {
  CreateRestaurantArgs,
  UpdateRestaurantArgs,
  UpdateRestaurantOpeningTime,
} from "./Restaurant.input";

@Resolver(Restaurant)
export default class RestaurantResolver {
  @Query(() => [Restaurant])
  getRestaurants(): Promise<Restaurant[]> {
    return RestaurantRepository.getRestaurants();
  }

  @Query(() => Restaurant)
  getRestaurantById(@Arg("id") id: string): Promise<Restaurant | null> {
    return RestaurantRepository.getRestaurantById(id);
  }

  @Authorized("ROLE_ADMIN")
  @Mutation(() => Restaurant)
  createRestaurant(
    @Args() { name, pole }: CreateRestaurantArgs
  ): Promise<Restaurant> {
    return RestaurantRepository.createRestaurant(name, pole);
  }

  @Authorized()
  @Mutation(() => Restaurant)
  updateRestaurant(
    @Args() { id, name }: UpdateRestaurantArgs
  ): Promise<Restaurant> {
    return RestaurantRepository.updateRestaurant(id, name);
  }

  @Authorized("ROLE_RESTAURANT")
  @Mutation(() => Restaurant)
  updateRestaurantOpeningTime(
    @Args()
    {
      id,
      hourOpenAt,
      minutesOpenAt,
      hourCloseAt,
      minutesCloseAt,
    }: UpdateRestaurantOpeningTime
  ): Promise<Restaurant> {
    return RestaurantRepository.updateRestaurantOpeningTime(
      id,
      hourOpenAt,
      minutesOpenAt,
      hourCloseAt,
      minutesCloseAt
    );
  }

  @Authorized("ROLE_ADMIN")
  @Mutation(() => Restaurant)
  deleteRestaurant(@Arg("id") id: string): Promise<Restaurant> {
    return RestaurantRepository.deleteRestaurant(id);
  }
}
