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
      name: "Pôle de Lyon",
      address: "1 rue de la République",
      zip_code: "69001",
      city: "Lyon",
      email: "contact@poledelyon.com",
      created_at: "2022-12-03 16:08:00",
      updated_at: "2022-12-03 16:08:00",
    });
    await this.repository.save({
      name: "Pôle de Brest",
      address: "98 bd de la Liberté",
      zip_code: "29200",
      city: "Brest",
      email: "contact@poledebrest.com",
      created_at: "2022-12-14 09:15:56",
      updated_at: "2022-12-14 09:15:56",
    });
    await this.repository.save({
      name: "Pôle de Marseille",
      address: "56 rue de la mer",
      zip_code: "13001",
      city: "Marseille",
      email: "contact@poledemarseille.com",
      created_at: "2022-12-15 10:28:32",
      updated_at: "2022-12-15 10:28:32",
    });
  }

  static async getPoleById(id: string): Promise<Pole | null> {
    return this.repository.findOneBy({ id: id });
  }

  static async getPoleByName(name: string): Promise<Pole | null> {
    return this.repository.findOneBy({ name: name });
  }
}
