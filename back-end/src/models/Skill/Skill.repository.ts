import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Skill from "./Skill.entity";

export default class SkillRepository {
  private static repository: Repository<Skill>;
  static async initializeRepository() {
    this.repository = await getRepository(Skill);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }

  static async initializeSkills() {
    this.clearRepository();
    await this.repository.save({
      skillName: "PHP",
    });
    await this.repository.save({
      skillName: "JavaScript",
    });
  }

  static async getSkillByName(name: string): Promise<Skill | null> {
    return this.repository.findOneBy({ skillName: name });
  }

  static async getSkillById(id: string): Promise<Skill | null> {
    return this.repository.findOneBy({ id });
  }
}
