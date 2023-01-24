import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export default class Ticket {
  constructor(
    number: number,
    name : string,
    createdAt : Date,
    email?: string,
    phoneNumber?: string,
    deliveredAt? : Date,
    placedAt? : Date,
    closedAt? : Date
    ) {
    this.number = number;
    this.name = name;
    this.email = email,
    this.phoneNumber = phoneNumber,
    this.createdAt = createdAt,
    this.deliveredAt = deliveredAt,
    this.placedAt = placedAt,
    this.closedAt = closedAt
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

}
