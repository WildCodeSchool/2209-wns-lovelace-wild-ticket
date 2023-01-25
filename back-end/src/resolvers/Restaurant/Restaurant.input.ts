import { IsUUID, MinLength, MaxLength } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
class CreateRestaurantArgs {
  @Field()
  @MinLength(1, {
    message: "Le nom doit faire au moins un caractère de long.",
  })
  @MaxLength(255, {
    message: "Le nom doit faire au maximum 255 caractères de long.",
  })
  name: string;

  @Field(() => ID)
  @IsUUID()
  pole: string;
}

@ArgsType()
class UpdateRestaurantArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field()
  @MinLength(1, {
    message: "Le nom doit faire au moins un caractère de long.",
  })
  @MaxLength(255, {
    message: "Le nom doit faire au maximum 255 caractères de long.",
  })
  name: string;
}

@ArgsType()
class UpdateRestaurantOpeningTime {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field()
  openAt: Date;

  @Field()
  closeAt: Date;
}

export {
  CreateRestaurantArgs,
  UpdateRestaurantArgs,
  UpdateRestaurantOpeningTime,
};
