import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Pole from "./Pole.entity";
import PoleFixtures from "../../DataFixtures/PoleFixtures";

export default class PoleDb {
  protected static repository: Repository<Pole>;

  public static async initializeRepository() {
    this.repository = await getRepository(Pole);
  }

  public static async initializePoles(): Promise<void> {
    const poleFixtures = PoleFixtures.PoleFixtures;
    for (const poleFixture of poleFixtures) {
      await this.repository.save(poleFixture);
    }
  }

  public static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }

  public static async getPoleByName(name: string): Promise<Pole | null> {
    const pole = this.repository.findOneBy({ name: name });

    if (!pole) {
      throw new Error("Aucun pôle ne correspond à ce nom.");
    }

    return pole;
  }
}
