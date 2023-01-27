import {
  IsUUID,
  MinLength,
  MaxLength,
  IsString,
  Matches,
  IsEmail,
} from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

const postalCodeRegex = new RegExp("^[0-9]{5}$");

@ArgsType()
class CreatePoleArgs {
  @Field()
  @IsString({ message: "Le nom doit être une chaine de caractère." })
  @MinLength(1, { message: "Le nom doit faire au moins un caractère de long." })
  @MaxLength(255, {
    message: "Le nom doit faire au maximum 255 caractères de long.",
  })
  name: string;

  @Field()
  @IsString({ message: "L'adresse doit être une chaine de caractère." })
  @MaxLength(255, {
    message: "L'adresse doit faire au maximum 255 caractères de long.",
  })
  address: string;

  @Field()
  @IsString({ message: "Le code postal doit être une chaine de caractère." })
  @Matches(postalCodeRegex, {
    message: "Le code postal n'est pas un code postal valide.",
  })
  zipCode: string;

  @Field()
  @IsString({ message: "La ville doit être une chaine de caractère." })
  @MaxLength(255, {
    message: "La ville doit faire au maximum 255 caractères de long.",
  })
  city: string;

  @Field()
  @IsString({ message: "L'adresse email doit être une chaine de caractère." })
  @IsEmail({ message: "L'adresse email n'est pas une adresse email valide." })
  email: string;
}

@ArgsType()
class UpdatePoleArgs extends CreatePoleArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

export { CreatePoleArgs, UpdatePoleArgs };
