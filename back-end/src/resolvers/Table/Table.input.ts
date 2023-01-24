import { IsUUID, IsPositive } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";
import Restaurant from "../../models/Restaurant/Restaurant.entity";

@ArgsType()
class CreateTableArgs {
  @Field()
  @IsPositive()
  number: number;

  @Field()
  @IsPositive()
  capacity: number;

  @Field()
  @IsUUID()
  restaurant: string;
}

@ArgsType()
class UpdateTableArgs extends CreateTableArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

export { CreateTableArgs, UpdateTableArgs };