import { Contains, IsEmail, Matches, MaxLength, MinLength } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

const passwordRegExp = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

@ArgsType()
export class UserCreationArgs {
  @Field()
  @MinLength(1, {
    message: "Le login doit faire au moins un caractère de long.",
  })
  @MaxLength(255, {
    message: "Le login doit faire au plus 255 caractères de long.",
  })
  login: string;

  @Field()
  @IsEmail()
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

  @Field()
  @Contains("ROLE_")
  role: string;
}

@ArgsType()
export class UserUpdateArgs {
  @Field(() => ID)
  id: string;

  @Field()
  @MinLength(1, {
    message: "Le login doit faire au moins un caractère de long.",
  })
  @MaxLength(255, {
    message: "Le login doit faire au plus 255 caractères de long.",
  })
  login: string;

  @Field()
  @IsEmail()
  @MaxLength(255, {
    message: "L'adresse email doit faire au plus 255 caractères de long.",
  })
  email: string;

  @Field()
  @Contains("ROLE_")
  role: string;
}

//USER UPDATE PASSWORD

@ArgsType()
export class SignInArgs {
  @Field()
  @IsEmail()
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
}
