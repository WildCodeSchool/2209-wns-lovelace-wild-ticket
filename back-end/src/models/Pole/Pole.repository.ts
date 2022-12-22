import { Repository } from "typeorm";
import Pole from "./Pole.entity";
import RestaurantRepository from "../Restaurant/Restaurant.repository";
import { getRepository } from "../../database/utils";
import PoleFixtures from "../../DataFixtures/PoleFixtures";

export default class PoleRepository {
  private static repository: Repository<Pole>;

  static async initializeRepository() {
    this.repository = await getRepository(Pole);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async initializePoles(): Promise<void> {
    await PoleRepository.clearRepository();
    await this.repository.delete({});
    const poleFixtures = PoleFixtures.PoleFixtures;
    for (const poleFixture of poleFixtures) {
      await this.repository.save(poleFixture);
    }
  }

  static async getPoles(): Promise<Pole[]> {
    return this.repository.find();
  }

  static async createPole(
    name: string,
    address: string,
    zipCode: string,
    city: string,
    email: string
  ): Promise<Pole> {
    const createdAt = new Date();
    const newPole = new Pole(name, address, zipCode, city, email, createdAt);
    await this.repository.save(newPole);
    return newPole;
  }

  static async updatePole(
    id: string,
    name: string,
    address: string,
    zipCode: string,
    city: string,
    email: string
  ): Promise<
    {
      id: string;
      name: string;
      address: string;
      zipCode: string;
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
      zipCode,
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
