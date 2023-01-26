import DateUpdates from "../services/DateUpdates";

export type RestaurantFixturesType = {
  name: string;
  createdAt: Date;
  updatedAt?: Date;
  openAt?: Date;
  closeAt?: Date;
};

export default class RestaurantFixtures {
  static async getRestaurants(): Promise<RestaurantFixturesType[]> {
    return [
      {
        name: "PizzaMinute",
        createdAt: new Date("2022-12-20T11:00:00"),
        openAt: DateUpdates.updateOpenedClosedHoursRestaurant(11, 0o0),
        closeAt: DateUpdates.updateOpenedClosedHoursRestaurant(23, 30),
      },
      {
        name: "Lardonnaise",
        createdAt: new Date("2022-12-20T11:00:00"),
        openAt: DateUpdates.updateOpenedClosedHoursRestaurant(11, 0o0),
        closeAt: DateUpdates.updateOpenedClosedHoursRestaurant(23, 30),
      },
      {
        name: "Le Bouchon Végé",
        createdAt: new Date("2022-12-20T11:00:00"),
        openAt: DateUpdates.updateOpenedClosedHoursRestaurant(11, 0o0),
        closeAt: DateUpdates.updateOpenedClosedHoursRestaurant(23, 30),
      },
      {
        name: "La Galette Flambée",
        createdAt: new Date("2022-12-20T11:00:00"),
        openAt: DateUpdates.updateOpenedClosedHoursRestaurant(11, 0o0),
        closeAt: DateUpdates.updateOpenedClosedHoursRestaurant(23, 30),
      },
      {
        name: "La Bigoudène Joyeuse",
        createdAt: new Date("2022-12-20T11:00:00"),
        openAt: DateUpdates.updateOpenedClosedHoursRestaurant(11, 0o0),
        closeAt: DateUpdates.updateOpenedClosedHoursRestaurant(23, 30),
      },
      {
        name: "La Sardine De Brest",
        createdAt: new Date("2022-12-20T11:00:00"),
        openAt: DateUpdates.updateOpenedClosedHoursRestaurant(11, 0o0),
        closeAt: DateUpdates.updateOpenedClosedHoursRestaurant(23, 30),
      },
    ];
  }
}
