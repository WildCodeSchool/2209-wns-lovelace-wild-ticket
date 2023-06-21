import {
  IsUUID,
  MinLength,
  MaxLength,
  IsInt,
  IsPositive,
  IsNumber,
  IsString,
  ValidateIf,
} from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
class GetPaginateRestaurantsByPole {
  @Field()
  @IsString()
  pole: string;

  @Field()
  @IsNumber()
  @IsPositive()
  pageNumber: number;
}

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

  @Field()
  @IsPositive()
  ticketWaitingLimit: number;

  @Field()
  @IsPositive()
  notComingTicketDisapearDelay: number;

  @Field({ nullable: true })
  @ValidateIf((value) => value === null)
  picture: string;

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

  @Field()
  @IsPositive()
  ticketWaitingLimit: number;

  @Field()
  @IsPositive()
  notComingTicketDisapearDelay: number;

  @Field({ nullable: true })
  @ValidateIf((value) => value === null)
  picture: string;
}

@ArgsType()
class UpdateRestaurantOpeningTime {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field()
  @IsInt()
  hourOpenAt: number;

  @Field()
  @IsInt()
  minutesOpenAt: number;

  @Field()
  @IsInt()
  hourCloseAt: number;

  @Field()
  @IsInt()
  minutesCloseAt: number;
}

export {
  GetPaginateRestaurantsByPole,
  CreateRestaurantArgs,
  UpdateRestaurantArgs,
  UpdateRestaurantOpeningTime,
};
