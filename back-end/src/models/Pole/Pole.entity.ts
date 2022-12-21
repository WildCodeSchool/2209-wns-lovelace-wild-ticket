import { IsEmail } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Restaurant from "../Restaurant/Restaurant.entity";

@Entity()
@ObjectType()
export default class Pole {
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
  created_at: string;

  @Column()
  @Field()
  updated_at: string;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.pole)
  @Field(() => [Restaurant])
  restaurant: Restaurant[];
}
