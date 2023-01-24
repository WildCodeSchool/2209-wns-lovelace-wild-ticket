import { IsUUID, MinLength, IsEmail, IsMobilePhone, Matches } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

// const regexPhoneNumber = /^(?:(?:\+|00|0)((262|692)|(263|693)|508|(5|6)90|(5|6)94|(5|6|7)96|681|687|689))(?:[\s.-]*\d{2}){3,4}$/;

@ArgsType()
class CreateTicketArgs {
  @Field()
  @MinLength(1, {
    message: "Le prénom doit faire au moins un caractère de long.",
  })
  name: string;

  @Field()
  @IsEmail()
  email?: string;

  @Field()
  // @IsMobilePhone()
  // @Matches(regexPhoneNumber)
  phoneNumber?: string;

}

@ArgsType()
class UpdateTicketArgs extends CreateTicketArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

export { CreateTicketArgs, UpdateTicketArgs };