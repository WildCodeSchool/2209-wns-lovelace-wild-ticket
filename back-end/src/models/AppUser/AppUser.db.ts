import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import AppUser from "./AppUser.entity";
import DateUpdates from "../../services/DateUpdates";
import SessionRepository from "./Session.repository";
import { AppUserFixtures } from "../../DataFixtures/AppUserFixtures";
import { hashSync } from "bcryptjs";
import RestaurantRepository from "../Restaurant/Restaurant.repository";
import Restaurant from "../Restaurant/Restaurant.entity";

export default class AppUserDb {
  protected static repository: Repository<AppUser>;

  public static async initializeRepository() {
    this.repository = await getRepository(AppUser);
  }

  public static async initializeAppUsers(
    AppUserFixtures: AppUserFixtures[]
  ): Promise<void> {
    await Promise.all(
      AppUserFixtures.map(async (appUser) => {
        const appUserPassword = hashSync(appUser.password);
        const appUserCreationDate = new Date(appUser.createdAt);
        let appUserRestaurant = undefined;

        if (appUser.restaurant) {
          appUserRestaurant = (await RestaurantRepository.getRestaurantByName(
            appUser.restaurant
          )) as Restaurant;
        }

        const newAppUser = new AppUser(
          appUser.firstname,
          appUser.lastname,
          appUser.email,
          appUserPassword,
          appUser.role,
          appUserCreationDate,
          appUserRestaurant
        );

        await this.repository.save(newAppUser);
      })
    );
  }

  public static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }

  public static async getUserBySessionId(
    sessionId: string
  ): Promise<AppUser | null> {
    const session = await SessionRepository.getSessionById(sessionId);

    if (!session) {
      return null;
    }

    return session.user;
  }

  protected static async getUserByEmailAddress(
    email: string
  ): Promise<AppUser | null> {
    const user = await this.repository.findOneBy({ email });

    if (!user) {
      throw new Error("Aucun utilisateur ne correspond à cet email.");
    }

    return user;
  }

  protected static async setUserPasswordToken(
    id: string,
    resetPasswordToken: string,
    state: string | null = null
  ): Promise<AppUser> {
    // Token expiration date set to 24 hours for new user's password and 30 minutes for reset password
    const resetPasswordTokenExpiration =
      state === "newUser"
        ? DateUpdates.addHoursToDate(new Date(), 24)
        : DateUpdates.addMinutesToDate(new Date(), 30);

    return this.repository.save({
      id: id,
      resetPasswordToken: resetPasswordToken,
      resetPasswordTokenExpiration: resetPasswordTokenExpiration,
    });
  }

  protected static async getUserByToken(
    resetPasswordToken: string
  ): Promise<AppUser | null> {
    const user = await this.repository.findOneBy({ resetPasswordToken });

    if (!user) {
      throw new Error("Aucun utilisateur ne correspond à ce token.");
    }

    return user;
  }
}
