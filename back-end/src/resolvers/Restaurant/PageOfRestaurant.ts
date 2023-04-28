import { Field, Int, ObjectType } from "type-graphql";
import Restaurant from "../../models/Restaurant/Restaurant.entity";

@ObjectType()
class PageOfRestaurants {
  @Field(() => Int)
  totalCount: number;

  @Field(() => Int, { nullable: true })
  nextPageNumber: number | null;

  @Field(() => [Restaurant])
  restaurants: Restaurant[];
}

export default PageOfRestaurants;
