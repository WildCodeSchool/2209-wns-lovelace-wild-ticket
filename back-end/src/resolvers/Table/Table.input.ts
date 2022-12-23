import { IsUUID, IsPositive } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
class CreateTableArgs {
  @Field()
  @IsPositive()
  number: number;

  @Field()
  @IsPositive()
  capacity: number;
}

@ArgsType()
class UpdateTableArgs extends CreateTableArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

export { CreateTableArgs, UpdateTableArgs };