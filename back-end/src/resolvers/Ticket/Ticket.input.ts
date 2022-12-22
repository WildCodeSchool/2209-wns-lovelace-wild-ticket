import { IsUUID, IsPositive, MinLength, IsEmail, IsMobilePhone, IsDate } from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
class CreateTicketArgs {
  @Field()
  @IsPositive()
  number: number;

  @Field()
  @MinLength(1, {
    message: "Le prénom doit faire au moins un caractère de long.",
  })
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsMobilePhone(locale: string)
  phoneNumber: string;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  deliveredAt?: Date;

  @Field()
  @IsDate()
  placedAt?: Date;

  @Field()
  @IsDate()
  closedAt?: Date;
}

@ArgsType()
class UpdateTicketArgs extends CreateTicketArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

export { CreateTicketArgs, UpdateTicketArgs };