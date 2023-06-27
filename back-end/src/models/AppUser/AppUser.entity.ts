import { IsEmail } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Restaurant from "../Restaurant/Restaurant.entity";

@Entity()
@ObjectType()
export default class AppUser {
  constructor(
    firstname: string,
    lastname: string,
    email: string,
    hashedPassword: string,
    role: string,
    createdAt: Date,
    restaurant?: Restaurant,
    updatedAt?: Date,
    resetPasswordToken?: string,
    resetPasswordTokenExpiration?: Date
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.role = role;
    this.createdAt = createdAt;
    if (restaurant) {
      this.restaurant = restaurant;
    }
    if (updatedAt) {
      this.updatedAt = updatedAt;
    }
    if (resetPasswordToken) {
      this.resetPasswordToken = resetPasswordToken;
    }
    if (resetPasswordTokenExpiration) {
      this.resetPasswordTokenExpiration = resetPasswordTokenExpiration;
    }
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column("varchar", {
    length: 255,
  })
  @Field()
  firstname: string;

  @Column("varchar", {
    length: 255,
  })
  @Field()
  lastname: string;

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

  @OneToOne(() => Restaurant, (restaurant) => restaurant.appUser, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  @Field({ nullable: true })
  restaurant?: Restaurant;

  @Column()
  @Field()
  createdAt: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true, type: "varchar", length: 255 })
  @Field({ nullable: true })
  resetPasswordToken?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  resetPasswordTokenExpiration?: Date;
}
