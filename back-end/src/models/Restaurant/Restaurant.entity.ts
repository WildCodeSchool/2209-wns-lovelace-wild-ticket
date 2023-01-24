import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import AppUser from "../AppUser/AppUser.entity";
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

  @OneToOne(() => AppUser, (appUser) => appUser.restaurant)
  appUser?: AppUser;
}
