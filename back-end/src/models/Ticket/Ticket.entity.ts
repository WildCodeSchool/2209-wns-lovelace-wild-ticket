import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Restaurant from "../Restaurant/Restaurant.entity";
import Table from "../Table/Table.entity";

@Entity()
@ObjectType()
export default class Ticket {
  constructor(
    number: number,
    name : string,
    createdAt : Date,
    restaurant : Restaurant,
    email?: string,
    phoneNumber?: string,
    table?: Table,
    deliveredAt?: Date,
    placedAt?: Date,
    closedAt?: Date
    ) {
    this.number = number;
    this.name = name;
    this.restaurant = restaurant;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.table = table;
    this.createdAt = createdAt;
    this.deliveredAt = deliveredAt;
    this.placedAt = placedAt;
    this.closedAt = closedAt;
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  number: number;

  @Column()
  @Field()
  name: string;

  @Column({nullable: true})
  @Field()
  email?: string;

  @Column({nullable: true})
  @Field()
  phoneNumber?: string;

  @Column()
  @Field()
  createdAt: Date;

  @Column({nullable: true})
  @Field()
  deliveredAt?: Date;

  @Column({nullable: true})
  @Field()
  placedAt?: Date;

  @Column({nullable: true})
  @Field()
  closedAt?: Date;

  @ManyToOne(() => Table, (table: any) => table.tickets,  { eager: true })
  @Field(() => Table)
  table?: Table;

  @ManyToOne(() => Restaurant, (restaurant: any) => restaurant.tickets,  { eager: true })
  @Field(() => Restaurant)
  restaurant: Restaurant;
}
