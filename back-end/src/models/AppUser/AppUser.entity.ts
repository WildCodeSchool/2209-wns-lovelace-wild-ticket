import { IsEmail } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
@ObjectType()
export default class AppUser {
  constructor(
    login: string,
    email: string,
    hashedPassword: string,
    role: string,
    createdAt: Date,
    updatedAt?: Date
  ) {
    this.login = login;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column("varchar", {
    length: 255,
  })
  @Field()
  login: string;

  @Column("varchar", {
    length: 255,
  })
  @Field()
  @Index({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  hashedPassword: string;

  @Column("varchar", {
    length: 255,
  })
  @Field()
  role: string;

  @Column()
  @Field()
  createdAt: Date;

  @Column({ nullable: true })
  @Field()
  updatedAt?: Date;
}
