import { IsUUID, MinLength } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
class CreateRestaurantArgs {
  @Field()
  @MinLength(1, {
    message: "Le nom doit faire au moins un caractère de long.",
  })
  name: string;
}

@ArgsType()
class UpdateRestaurantArgs extends CreateRestaurantArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

export { CreateRestaurantArgs, UpdateRestaurantArgs };
