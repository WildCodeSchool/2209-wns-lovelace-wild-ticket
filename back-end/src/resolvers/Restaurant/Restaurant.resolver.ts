import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";

import Restaurant from "../../models/Restaurant/Restaurant.entity";
import RestaurantRepository from "../../models/Restaurant/Restaurant.repository";
import { CreateRestaurantArgs, UpdateRestaurantArgs } from "./Restaurant.input";

@Resolver(Restaurant)
export default class RestaurantResolver {
  @Query(() => [Restaurant])
  restaurant(): Promise<Restaurant[]> {
    return RestaurantRepository.getRestaurants();
  }

  @Mutation(() => Restaurant)
  createRestaurant(
    @Args() { name }: CreateRestaurantArgs
  ): Promise<Restaurant> {
    return RestaurantRepository.createRestaurant(name);
  }

  @Mutation(() => Restaurant)
  updateRestaurant(
    @Args() { id, name }: UpdateRestaurantArgs
  ): Promise<Restaurant> {
    return RestaurantRepository.updateRestaurant(id, name);
  }

  @Mutation(() => Restaurant)
  deleteWilder(@Arg("id") id: string): Promise<Restaurant> {
    return RestaurantRepository.deleteRestaurant(id);
  }
}
