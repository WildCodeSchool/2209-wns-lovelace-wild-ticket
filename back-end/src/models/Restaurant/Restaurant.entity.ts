import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Pole from "../Pole/Pole.entity";

@Entity()
@ObjectType()
export default class Restaurant {
  constructor(
    name: string,
    pole: Pole,
    createdAt: Date,
    updatedAt?: Date,
    openAt?: Date,
    closeAt?: Date
  ) {
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.openAt = openAt;
    this.closeAt = closeAt;
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
}
