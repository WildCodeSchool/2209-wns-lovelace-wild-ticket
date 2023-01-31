import { IsUUID, IsPositive } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
class CreateTableArgs {
  @Field()
  @IsPositive({ message: "Les nombres négatifs ne sont pas autorisés." })
  number: number;

  @Field()
  @IsPositive({ message: "Les nombres négatifs ne sont pas autorisés." })
  capacity: number;

  @Field()
  @IsUUID()
  restaurant: string;
}

@ArgsType()
class UpdateTableArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field()
  @IsPositive()
  number: number;

  @Field()
  @IsPositive()
  capacity: number;
}

export { CreateTableArgs, UpdateTableArgs };
