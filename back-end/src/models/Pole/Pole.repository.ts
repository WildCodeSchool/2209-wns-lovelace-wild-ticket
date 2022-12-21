import { Repository } from "typeorm";
import Pole from "./Pole.entity";
import RestaurantRepository from "../Restaurant/Restaurant.repository";
import { getRepository } from "../../database/utils";

export default class PoleRepository {
  private static repository: Repository<Pole>;
  static async initializeRepository() {
    this.repository = await getRepository(Pole);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async initializePoles(): Promise<void> {
    await RestaurantRepository.clearRepository();
    await this.repository.delete({});
    await this.repository.save({
      name: "Lyon",
    });
    await this.repository.save({
      name: "Brest",
    });
  }

  static async getPoleByName(name: string): Promise<Pole | null> {
    return this.repository.findOneBy({ name: name });
  }
}
