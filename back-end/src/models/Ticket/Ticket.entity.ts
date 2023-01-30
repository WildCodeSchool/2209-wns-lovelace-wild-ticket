import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Restaurant from "../Restaurant/Restaurant.entity";
import Table from "../Table/Table.entity";

@Entity()
@ObjectType()
export default class Ticket {
  constructor(
    number: number,
    name: string,
    seats: number,
    createdAt: Date,
    restaurant: Restaurant,
    email?: string,
    phoneNumber?: string,
    table?: Table,
    deliveredAt?: Date,
    placedAt?: Date,
    closedAt?: Date
  ) {
    this.number = number;
    this.name = name;
    this.seats = seats;
    this.restaurant = restaurant;
    this.createdAt = createdAt;
    if (email) {
      this.email = email;
    }
    if (phoneNumber) {
      this.phoneNumber = phoneNumber;
    }
    if (table) {
      this.table = table;
    }
    if (deliveredAt) {
      this.deliveredAt = deliveredAt;
    }
    if (placedAt) {
      this.placedAt = placedAt;
    }
    if (closedAt) {
      this.closedAt = closedAt;
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
  name: string;

  @Column()
  @Field()
  seats: number;

  @Column({ nullable: true })
  @Field()
  email?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phoneNumber?: string;

  @Column()
  @Field()
  createdAt: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  deliveredAt?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  placedAt?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  closedAt?: Date;

  @ManyToOne(() => Table, (table: any) => table.tickets, {
    eager: true,
    onDelete: "CASCADE",
  })
  @Field(() => Table, { nullable: true })
  table?: Table;

  @ManyToOne(() => Restaurant, (restaurant: any) => restaurant.tickets, {
    eager: true,
    onDelete: "CASCADE",
  })
  @Field(() => Restaurant)
  restaurant: Restaurant;
}
