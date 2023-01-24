import { IsEmail } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import AppUser from "../AppUser/AppUser.entity";
import Restaurant from "../Restaurant/Restaurant.entity";

@Entity()
@ObjectType()
export default class Pole {
  constructor(
    name: string,
    address: string,
    zipCode: string,
    city: string,
    email: string,
    createdAt: Date,
    appUser: AppUser,
    updatedAt?: Date
  ) {
    this.name = name;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.email = email;
    this.createdAt = createdAt;
    this.appUser = appUser;
    if (updatedAt) {
      this.updatedAt = updatedAt;
    }
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  zipCode: string;

  @Column()
  @Field()
  city: string;

  @Column()
  @Field()
  @IsEmail()
  email: string;

  @ManyToMany(() => AppUser, (appUser) => appUser.poles)
  appUser: AppUser;

  @Column()
  @Field()
  createdAt: Date;

  @Column({ nullable: true })
  @Field()
  updatedAt?: Date;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.pole)
  @Field(() => [Restaurant])
  restaurant: Restaurant[];
}
