import { IsUUID, MinLength } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
class CreateWilderArgs {
  @Field()
  @MinLength(1, {
    message: "Le prénom doit faire au moins un caractère de long.",
  })
  firstName: string;

  @Field()
  @MinLength(1, { message: "Le nom doit faire au moins un caractère de long." })
  lastName: string;
}

@ArgsType()
class UpdateWilderArgs extends CreateWilderArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

export { CreateWilderArgs, UpdateWilderArgs };
