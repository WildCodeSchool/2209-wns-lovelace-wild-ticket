import { IsUUID, MinLength } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
class CreatePoleArgs {
  @Field()
  @MinLength(1, {
    message: "Le nom doit faire au moins un caractère de long.",
  })
  name: string;

  @Field()
  address: string;

  @Field()
  zip_code: string;

  @Field()
  city: string;

  @Field()
  email: string;
}

@ArgsType()
class UpdatePoleArgs extends CreatePoleArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

export {
  CreatePoleArgs,
  UpdatePoleArgs,
};
