import { Repository } from "typeorm";
import School from "./School.entity";
import WilderRepository from "../Wilder/Wilder.repository";
import { getRepository } from "../../database/utils";

export default class SchoolRepository {
  private static repository: Repository<School>;
  static async initializeRepository() {
    this.repository = await getRepository(School);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async initializeSchools(): Promise<void> {
    await WilderRepository.clearRepository();
    await this.repository.delete({});
    await this.repository.save({
      schoolName: "Lyon",
    });
    await this.repository.save({
      schoolName: "Brest",
    });
  }

  static async getSchoolByName(name: string): Promise<School | null> {
    return this.repository.findOneBy({ schoolName: name });
  }
}
