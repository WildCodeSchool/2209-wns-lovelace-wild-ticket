import { IsEmail } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    updatedAt?: Date
  ) {
    this.name = name;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.email = email;
    this.createdAt = createdAt;
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

  @OneToMany(() => Restaurant, (restaurant) => restaurant.pole)
  @Field(() => [Restaurant], { nullable: true })
  restaurant: Restaurant[];

  @Column()
  @Field()
  createdAt: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  updatedAt?: Date;
}
