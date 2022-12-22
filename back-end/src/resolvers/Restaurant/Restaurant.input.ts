import { IsUUID, MinLength } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
class CreateRestaurantArgs {
  @Field()
  @MinLength(1, {
    message: "Le nom doit faire au moins un caractère de long.",
  })
  name: string;

  @Field(() => ID)
  @IsUUID()
  pole: string;
}

@ArgsType()
class UpdateRestaurantArgs extends CreateRestaurantArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

@ArgsType()
class UpdateRestaurantOpeningTime extends CreateRestaurantArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field()
  open_at: Date;

  @Field()
  close_at: Date;
}

export {
  CreateRestaurantArgs,
  UpdateRestaurantArgs,
  UpdateRestaurantOpeningTime,
};
