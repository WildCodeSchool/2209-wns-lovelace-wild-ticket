import { randomBytes } from "crypto";
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import AppUser from "./AppUser.entity";

@Entity()
export default class Session {
  constructor(user: AppUser, createdAt: Date) {
    this.user = user;
    this.createdAt = createdAt;
  }

  @PrimaryColumn("varchar", {
    length: 32,
  })
  id: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => AppUser, { eager: true, onDelete: "CASCADE" })
  user: AppUser;

  @BeforeInsert()
  setId() {
    this.id = randomBytes(16).toString("hex");
  }
}
