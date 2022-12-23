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
  restaurants(): Promise<Restaurant[]> {
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
    @Args() { id, openAt, closeAt }: UpdateRestaurantOpeningTime
  ): Promise<Restaurant> {
    return RestaurantRepository.updateRestaurantOpeningTime(
      id,
      openAt,
      closeAt
    );
  }

  @Mutation(() => Restaurant)
  deleteRestaurant(@Arg("id") id: string): Promise<Restaurant> {
    return RestaurantRepository.deleteRestaurant(id);
  }
}
