import { IsUUID, MinLength, IsEmail, IsMobilePhone, Matches } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

// const regexPhoneNumber = '^0[1-9][0-9]{8}$';

@ArgsType()
class CreateTicketArgs {
  @Field()
  @MinLength(1, {
    message: "Le prénom doit faire au moins un caractère de long.",
  })
  name: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  // @IsMobilePhone()
  // @Matches(regexPhoneNumber)
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