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
    pole: Pole,
    created_at: Date,
    updated_at?: Date,
    open_at?: Date,
    close_at?: Date
  ) {
    this.name = name;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.open_at = open_at;
    this.close_at = close_at;
    this.pole = pole;
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  created_at: Date;

  @Column()
  @Field()
  updated_at?: Date;

  @Column()
  @Field()
  open_at?: Date;

  @Column()
  @Field()
  close_at?: Date;

  @ManyToOne(() => Pole, (pole) => pole.restaurant, { eager: true })
  @Field(() => Pole, { nullable: false })
  pole: Pole;

  @Field(() => String)
  getName() {
    return this.name;
  }
}
