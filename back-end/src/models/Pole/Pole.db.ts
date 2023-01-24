import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Pole from "./Pole.entity";

export default class PoleDb {
  protected static repository: Repository<Pole>;
  static async initializeRepository() {
    this.repository = await getRepository(Pole);
  }

  protected static findPoleById(poleId: string) {
    return this.repository.findOneBy({ id: poleId });
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }
}
