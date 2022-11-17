import { randomBytes } from "crypto";
import { BeforeInsert, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import AppUser from "./AppUser.entity";

@Entity()
export default class Session {
  constructor(user: AppUser) {
    this.user = user;
  }

  @PrimaryColumn("varchar", {
    length: 32,
  })
  id: string;

  @ManyToOne(() => AppUser, { eager: true })
  user: AppUser;

  @BeforeInsert()
  setId() {
    this.id = randomBytes(16).toString("hex");
  }
}
