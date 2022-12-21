import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Pole from "../Pole/Pole.entity";

@Entity()
@ObjectType()
export default class Restaurant {
  constructor(
    name: string,
    pole?: Pole,
  ) {
    this.name = name;
    if (pole) {
      this.pole = pole;
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
  created_at: string;

  @Column()
  @Field()
  updated_at: string;

  @Column()
  @Field()
  open_at: string;

  @Column()
  @Field()
  close_at: string;

  @ManyToOne(() => Pole, (pole) => pole.restaurant, { eager: true })
  @Field(() => Pole, { nullable: true })
  pole: Pole;

  @Field(() => String)
  getName() {
    return this.name;
  }
}
