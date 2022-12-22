import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export default class Table {
  constructor(
    number: number,
    capacity: number,
    ) {
    this.number = number;
    this.capacity = capacity;
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  number: number;

  @Column()
  @Field()
  capacity: number;

}