import {
  IsUUID,
  MinLength,
  IsEmail,
  Matches,
  MaxLength,
  IsInt,
  Min,
  Max,
  ValidateIf,
  IsNumber,
  IsDate,
  IsString,
} from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

const regexPhoneNumber = new RegExp("^(06|07)[0-9]{8}$");

@ArgsType()
class CreateTicketArgs {
  @Field()
  @MinLength(1, {
    message: "Le nom doit faire au moins un caractère de long.",
  })
  @MaxLength(255, {
    message: "Le nom doit faire au maximum 255 caractères de long.",
  })
  name: string;

  @Field()
  @IsInt({
    message:
      "Vous devez impérativement rentrer le nombre de couverts souhaités",
  })
  @Min(1, { message: "Vous ne pouvez pas choisir moins de 1 couvert." })
  @Max(8, { message: "Vous ne pouvez pas choisir plus de 8 couverts." })
  seats: number;

  @Field({ nullable: true })
  @IsEmail({ message: "L'email rentré n'est pas au bon format." })
  @ValidateIf((value) => value == null)
  email?: string;

  @Field({ nullable: true })
  @Matches(regexPhoneNumber, {
    message:
      "Le numéro de téléphone doit être au format: 06######## ou 07########",
  })
  @ValidateIf((value) => value == null)
  phoneNumber?: string;

  @Field()
  @IsUUID()
  restaurant: string;
}

@ArgsType()
class UpdateTicketArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field()
  @IsUUID()
  table: string;
}

@ArgsType()
class GetTicketsByRestaurantArgs {
  @Field(() => ID)
  @IsUUID()
  restaurantId: string;

  @Field({ nullable: true })
  @IsNumber()
  @ValidateIf((value) => value === null)
  seats: number;
}

@ArgsType()
class GetExportTicketsByRestaurantArgs {
  @Field(() => ID)
  @IsUUID()
  restaurantId: string;

  @Field({ nullable: true })
  @IsNumber()
  @ValidateIf((value) => value === null)
  seats: number;

  @Field({ nullable: true })
  @IsDate()
  @ValidateIf((value) => value === null)
  dateMin: Date;

  @Field({ nullable: true })
  @IsDate()
  @ValidateIf((value) => value === null)
  dateMax: Date;
}

@ArgsType()
class getPaginatedAndSortedTicketsArgs {
  @Field(() => ID)
  @IsUUID()
  restaurantId: string;

  @Field()
  @IsString()
  globalFilter: string;

  @Field()
  @IsInt()
  pageSize: number;

  @Field()
  @IsInt()
  pageNumber: number;

  @Field(() => [String], { nullable: true })
  sort: string[];

  @Field(() => [Number])
  order: number[];
}

export {
  CreateTicketArgs,
  UpdateTicketArgs,
  GetTicketsByRestaurantArgs,
  GetExportTicketsByRestaurantArgs,
  getPaginatedAndSortedTicketsArgs,
};
