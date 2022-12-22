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

  static async getPoles(): Promise<Pole[]> {
    return this.repository.find();
  }

  static async createPole(
    name: string,
    address: string,
    zip_code: string,
    city: string,
    email: string
  ): Promise<Pole> {
    const createdAt = new Date();
    const newPole = new Pole(name, address, zip_code, city, email, createdAt);
    await this.repository.save(newPole);
    return newPole;
  }

  static async updatePole(
    id: string,
    name: string,
    address: string,
    zip_code: string,
    city: string,
    email: string
  ): Promise<
    {
      id: string;
      name: string;
      address: string;
      zip_code: string;
      city: string;
      email: string;
    } & Pole
  > {
    const existingRestaurant = await this.repository.findOneBy({ id });
    const updatedAt = new Date();
    if (!existingRestaurant) {
      throw Error("No existing Restaurant matching ID.");
    }
    return this.repository.save({
      id,
      name,
      address,
      zip_code,
      city,
      email,
      updatedAt,
    });
  }

  static async getPoleById(id: string): Promise<Pole | null> {
    return this.repository.findOneBy({ id: id });
  }

  static async getPoleByName(name: string): Promise<Pole | null> {
    return this.repository.findOneBy({ name: name });
  }

  static async deletePole(id: string): Promise<Pole> {
    const existingPole = await this.getPoleById(id);
    if (!existingPole) {
      throw Error("No existing Pole matching ID.");
    }
    await this.repository.remove(existingPole);
    // resetting ID because existingRestaurant loses ID after calling remove
    existingPole.id = id;
    return existingPole;
  }
}
