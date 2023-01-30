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
} from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

const regexPhoneNumber = new RegExp("^(06|07)[0-9]{8}$");

@ArgsType()
class CreateTicketArgs {
  @Field()
  @MinLength(1, {
    message: "Le prénom doit faire au moins un caractère de long.",
  })
  @MaxLength(255, {
    message: "Le nom doit faire au maximum 255 caractères de long.",
  })
  name: string;

  @Field()
  @IsInt()
  @Min(1)
  @Max(8)
  seats: number;

  @Field({ nullable: true })
  @IsEmail()
  @ValidateIf((value) => value == null)
  email?: string;

  @Field({ nullable: true })
  @Matches(regexPhoneNumber)
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

export { CreateTicketArgs, UpdateTicketArgs };
