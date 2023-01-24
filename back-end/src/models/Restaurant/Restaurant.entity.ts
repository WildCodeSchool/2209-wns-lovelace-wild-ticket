import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from "typeorm";
import AppUser from "../AppUser/AppUser.entity";
import Pole from "../Pole/Pole.entity";
import Table from "../Table/Table.entity";
import Ticket from "../Ticket/Ticket.entity";

@Entity()
@ObjectType()
export default class Restaurant {
  constructor(
    name: string,
    pole: Pole,
    createdAt: Date,
    updatedAt?: Date,
    openAt?: Date,
    closeAt?: Date,
    appUser?: AppUser,
  ) {
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.openAt = openAt;
    this.closeAt = closeAt;
    this.appUser = appUser;
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
  createdAt: Date;

  @Column({ nullable: true })
  @Field()
  updatedAt?: Date;

  @Column({ nullable: true })
  @Field()
  openAt?: Date;

  @Column({ nullable: true })
  @Field()
  closeAt?: Date;

  @ManyToOne(() => Pole, { eager: true, onDelete: "CASCADE" })
  @Field(() => Pole, { nullable: false })
  pole: Pole;

  @OneToMany(() => Table, (table: any) => table.restaurant)
  @Field(() => [Table])
  table: Table[];

  @OneToMany(() => Ticket, (ticket: any) => ticket.restaurant)
  @Field(() => [Ticket])
  ticket: Ticket[];
  @OneToOne(() => AppUser, (appUser) => appUser.restaurant)
  appUser?: AppUser;
}
