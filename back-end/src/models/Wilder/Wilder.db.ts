import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Wilder from "./Wilder.entity";

export default class WilderDb {
  protected static repository: Repository<Wilder>;
  static async initializeRepository() {
    this.repository = await getRepository(Wilder);
  }

  protected static findWilderById(wilderId: string) {
    return this.repository.findOneBy({ id: wilderId });
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }
}
