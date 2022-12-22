import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";

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
  restaurant(): Promise<Restaurant[]> {
    return RestaurantRepository.getRestaurants();
  }

  @Mutation(() => Restaurant)
  createRestaurant(
    @Args() { name, pole }: CreateRestaurantArgs
  ): Promise<Restaurant> {
    return RestaurantRepository.createRestaurant(name, pole);
  }

  @Mutation(() => Restaurant)
  updateRestaurantName(
    @Args() { id, name }: UpdateRestaurantArgs
  ): Promise<Restaurant> {
    return RestaurantRepository.updateRestaurantName(id, name);
  }

  @Mutation(() => Restaurant)
  updateRestaurantOpeningTime(
    @Args() { id, open_at, close_at }: UpdateRestaurantOpeningTime
  ): Promise<Restaurant> {
    return RestaurantRepository.updateRestaurantOpeningTime(
      id,
      open_at,
      close_at
    );
  }

  @Mutation(() => Restaurant)
  deleteWilder(@Arg("id") id: string): Promise<Restaurant> {
    return RestaurantRepository.deleteRestaurant(id);
  }
}
