import {
  Contains,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

const passwordRegExp = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

@ArgsType()
export class UserCreationArgs {
  @Field()
  @MinLength(1, {
    message: "Le prénom doit faire au moins un caractère de long.",
  })
  @MaxLength(255, {
    message: "Le prénom doit faire au maximum 255 caractères de long.",
  })
  firstname: string;

  @Field()
  @MinLength(1, {
    message: "Le nom doit faire au moins un caractère de long.",
  })
  @MaxLength(255, {
    message: "Le nom doit faire au maximum 255 caractères de long.",
  })
  lastname: string;

  @Field()
  @IsEmail({ message: "L'email rentré n'est pas au bon format." })
  @MaxLength(255, {
    message: "L'adresse email doit faire au plus 255 caractères de long.",
  })
  email: string;

  @Field()
  @Contains("ROLE_")
  role: string;

  @Field({ nullable: true })
  restaurant: string;
}

@ArgsType()
export class UserUpdateArgs {
  @Field(() => ID)
  id: string;

  @Field()
  @MinLength(1, {
    message: "Le prénom doit faire au moins un caractère de long.",
  })
  @MaxLength(255, {
    message: "Le prénom doit faire au maximum 255 caractères de long.",
  })
  firstname: string;

  @Field()
  @MinLength(1, {
    message: "Le nom doit faire au moins un caractère de long.",
  })
  @MaxLength(255, {
    message: "Le nom doit faire au maximum 255 caractères de long.",
  })
  lastname: string;

  @Field()
  @IsEmail({ message: "L'email rentré n'est pas au bon format." })
  @MaxLength(255, {
    message: "L'adresse email doit faire au plus 255 caractères de long.",
  })
  email: string;

  @Field()
  @Contains("ROLE_")
  role: string;

  @Field({ nullable: true })
  restaurant: string;
}

//USER UPDATE PASSWORD
@ArgsType()
export class updateUserPasswordArgs {
  @Field(() => ID)
  id: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @Matches(passwordRegExp, {
    message:
      "Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
  })
  newUserPassword: string;
}

@ArgsType()
export class updateUserPasswordWithTokenArgs {
  @Field()
  token: string;

  @Field()
  @Matches(passwordRegExp, {
    message:
      "Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
  })
  password: string;
}

@ArgsType()
export class SignInArgs {
  @Field()
  @IsEmail({ message: "L'email rentré n'est pas au bon format." })
  @MaxLength(255, {
    message: "L'adresse email doit faire au plus 255 caractères de long.",
  })
  email: string;

  @Field()
  @Matches(passwordRegExp, {
    message:
      "Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
  })
  password: string;

  @Field({ nullable: true })
  rememberMe: boolean;
}

@ArgsType()
export class prepareAndSendResetPasswordEmailArgs {
  @Field()
  @IsEmail({ message: "L'email rentré n'est pas au bon format." })
  @MaxLength(255, {
    message: "L'adresse email doit faire au plus 255 caractères de long.",
  })
  email: string;
}
