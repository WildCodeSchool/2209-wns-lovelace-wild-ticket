import { IsEmail } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
@ObjectType()
export default class AppUser {
  constructor(
    firstName: string,
    lastName: string,
    emailAddress: string,
    hashedPassword: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.hashedPassword = hashedPassword;
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  @Index({ unique: true })
  @IsEmail()
  emailAddress: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  hashedPassword: string;
}
