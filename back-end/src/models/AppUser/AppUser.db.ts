import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import AppUser from "./AppUser.entity";

export default class AppUserDb {
  protected static repository: Repository<AppUser>;
  static async initializeRepository() {
    this.repository = await getRepository(AppUser);
  }

  protected static saveUser(user: AppUser): Promise<AppUser> {
    return this.repository.save(user);
  }

  protected static findByEmailAddress(
    emailAddress: string
  ): Promise<AppUser | null> {
    return this.repository.findOneBy({ emailAddress });
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }
}
