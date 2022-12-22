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
    zip_code: string,
    city: string,
    email: string,
    createdAt: Date,
    updatedAt?: Date
  ) {
    this.name = name;
    this.address = address;
    this.zip_code = zip_code;
    this.city = city;
    this.email = email;
    this.created_at = createdAt;
    if (updatedAt) {
      this.updated_at = updatedAt;
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
  zip_code: string;

  @Column()
  @Field()
  city: string;

  @Column()
  @Field()
  @IsEmail()
  email: string;

  @Column()
  @Field()
  created_at: Date;

  @Column({ nullable: true })
  @Field()
  updated_at?: Date;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.pole)
  @Field(() => [Restaurant])
  restaurant: Restaurant[];
}
