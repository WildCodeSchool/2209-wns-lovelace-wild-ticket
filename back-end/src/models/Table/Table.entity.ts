import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Restaurant from "../Restaurant/Restaurant.entity";
import Ticket from "../Ticket/Ticket.entity";

@Entity()
@ObjectType()
export default class Table {
  constructor(
    number: number,
    capacity: number,
    restaurant: Restaurant,
    ticket?: Ticket[]
  ) {
    this.number = number;
    this.capacity = capacity;
    this.restaurant = restaurant;
    if (ticket) {
      this.ticket = ticket;
    }
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

  @ManyToOne(() => Restaurant, (restaurant: any) => restaurant.tables, {
    eager: true,
    onDelete: "CASCADE",
  })
  @Field(() => Restaurant)
  restaurant: Restaurant;

  @OneToMany(() => Ticket, (ticket: any) => ticket.table)
  @Field(() => [Ticket], { nullable: true })
  ticket?: Ticket[];
}
