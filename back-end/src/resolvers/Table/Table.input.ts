import { IsUUID, IsPositive, IsNumber, ValidateIf } from "class-validator";
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

@ArgsType()
class GetTablesByRestaurantArgs {
  @Field(() => ID)
  @IsUUID()
  restaurantId: string;

  @Field({ nullable: true })
  @IsNumber()
  @ValidateIf((value) => value === null)
  capacity: number;
}

export { CreateTableArgs, UpdateTableArgs, GetTablesByRestaurantArgs };
