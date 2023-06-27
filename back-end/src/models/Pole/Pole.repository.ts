import Pole from "./Pole.entity";
import PoleDb from "./Pole.db";

export default class PoleRepository extends PoleDb {
  public static async getPoles(): Promise<Pole[]> {
    return await this.repository.find();
  }

  public static async getPoleById(id: string): Promise<Pole | null> {
    const pole = await this.repository.findOneBy({ id: id });

    if (!pole) {
      throw new Error("Aucun pôle ne correspond à cet ID.");
    }

    return pole;
  }

  public static async createPole(
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

  public static async updatePole(
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
    await this.getPoleById(id);

    const updatedAt = new Date();

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

  public static async deletePole(id: string): Promise<Pole> {
    const pole = (await this.getPoleById(id)) as Pole;

    await this.repository.remove(pole);

    // resetting ID because pole loses ID after calling remove
    pole.id = id;

    return pole;
  }
}
