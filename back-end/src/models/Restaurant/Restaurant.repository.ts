import { Repository } from "typeorm";
import Restaurant from "./Restaurant.entity";
import { getRepository } from "../../database/utils";
import Pole from "../Pole/Pole.entity";
import PoleRepository from "../Pole/Pole.repository";
import RestaurantDb from "./Restaurant.db";

export default class RestaurantRepository extends RestaurantDb {
  static async initializeRestaurants(): Promise<void> {
    await this.clearRepository();
    const lyonPole = (await PoleRepository.getPoleByName(
      "Pôle de Lyon"
    )) as Pole;
    const brestPole = (await PoleRepository.getPoleByName(
      "Pôle de Brest"
    )) as Pole;
    const marseillePole = (await PoleRepository.getPoleByName(
      "Pôle de Marseille"
    )) as Pole;
    const pizzaMinute = new Restaurant(
      "PizzaMinute",
      lyonPole,
      new Date("2022-12-20T11:00:00"),
      new Date("2022-12-20T11:00:00"),
      new Date("2022-12-24T11:00:00"),
      new Date("2022-12-24T23:30:00")
    );
    const lardonaise = new Restaurant(
      "Lardonaise",
      lyonPole,
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-24T11:00:00"),
      new Date("2022-12-24T23:30:00")
    );
    const leBouchonVégé = new Restaurant(
      "le Bouchon Végé",
      lyonPole,
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-24T11:00:00"),
      new Date("2022-12-24T23:30:00")
    );
    const laGaletteFlambée = new Restaurant(
      "La Galette Flambée",
      brestPole,
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-24T11:00:00"),
      new Date("2022-12-24T23:30:00")
    );
    const laBigoudèneJoyeuse = new Restaurant(
      "La Bigoudène Joyeuse",
      brestPole,
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-24T11:00:00"),
      new Date("2022-12-24T23:30:00")
    );
    const laSardineDeBrest = new Restaurant(
      "La Sardine De Brest",
      brestPole,
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-24T11:00:00"),
      new Date("2022-12-24T23:30:00")
    );
    const laMaisonDeLaBouillabaisse = new Restaurant(
      "La Maison De La Bouillabaisse",
      marseillePole,
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-24T11:00:00"),
      new Date("2022-12-24T23:30:00")
    );
    const tapenadePastisEtCompagnie = new Restaurant(
      "Tapenade Pastis Et Compagnie",
      marseillePole,
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-24T11:00:00"),
      new Date("2022-12-24T23:30:00")
    );
    const aioliDesCopains = new Restaurant(
      "L'Aïoli Des Copains",
      marseillePole,
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-20T11:12:00"),
      new Date("2022-12-24T11:00:00"),
      new Date("2022-12-24T23:30:00")
    );

    await this.repository.save([
      pizzaMinute,
      lardonaise,
      leBouchonVégé,
      laGaletteFlambée,
      laBigoudèneJoyeuse,
      laSardineDeBrest,
      laMaisonDeLaBouillabaisse,
      tapenadePastisEtCompagnie,
      aioliDesCopains,
    ]);
  }

  static async getRestaurants(): Promise<Restaurant[]> {
    return this.repository.find();
  }

  static async createRestaurant(
    name: string,
    idPole: string
  ): Promise<Restaurant> {
    const created_at = new Date("now");
    const pole = (await PoleRepository.getPoleById(idPole)) as Pole;
    const newRestaurant = new Restaurant(name, pole, created_at);
    await this.repository.save(newRestaurant);
    return newRestaurant;
  }

  static async updateRestaurantName(
    id: string,
    name: string
  ): Promise<
    {
      id: string;
      name: string;
    } & Restaurant
  > {
    const existingRestaurant = await this.repository.findOneBy({ id });
    if (!existingRestaurant) {
      throw Error("No existing Restaurant matching ID.");
    }
    return this.repository.save({
      id,
      name,
    });
  }

  static async updateRestaurantOpeningTime(
    id: string,
    open_at: Date,
    close_at: Date
  ): Promise<
    {
      id: string;
      open_at: Date;
      close_at: Date;
    } & Restaurant
  > {
    const existingRestaurant = await this.repository.findOneBy({ id });
    if (!existingRestaurant) {
      throw Error("No existing Restaurant matching ID.");
    }
    return this.repository.save({
      id,
      open_at,
      close_at,
    });
  }

  static async deleteRestaurant(id: string): Promise<Restaurant> {
    const existingRestaurant = await this.findRestaurantById(id);
    if (!existingRestaurant) {
      throw Error("No existing Restaurant matching ID.");
    }
    await this.repository.remove(existingRestaurant);
    // resetting ID because existingRestaurant loses ID after calling remove
    existingRestaurant.id = id;
    return existingRestaurant;
  }
}
