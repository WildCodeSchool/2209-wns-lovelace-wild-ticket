import AppUserDb from "./AppUser.db";
import AppUser from "./AppUser.entity";

import { hashSync, compareSync } from "bcryptjs";
import SessionRepository from "./Session.repository";
import Session from "./Session.entity";
import { AppUserFixtures } from "../../DataFixtures/AppUserFixtures";
import PoleRepository from "../Pole/Pole.repository";
import Pole from "../Pole/Pole.entity";
import RestaurantRepository from "../Restaurant/Restaurant.repository";
import Restaurant from "../Restaurant/Restaurant.entity";

export const INVALID_CREDENTIALS_ERROR_MESSAGE = "Identifiants incorrects.";

export default class AppUserRepository extends AppUserDb {
  static async initializeAppUsers(
    AppUserFixtures: AppUserFixtures[]
  ): Promise<void> {
    await Promise.all(
      AppUserFixtures.map(async (appUser) => {
        const appUserPassword = hashSync(appUser.password);
        const appUserCreationDate = new Date(appUser.createdAt);

        if (appUser.poles) {
          let appUserPoles = [];

          for (const pole of appUser.poles) {
            appUserPoles.push(
              (await PoleRepository.getPoleByName(pole)) as Pole
            );
          }

          const newAppUser = new AppUser(
            appUser.login,
            appUser.email,
            appUserPassword,
            appUser.role,
            appUserCreationDate,
            undefined,
            appUserPoles
          );

          await this.repository.save(newAppUser);
        }

        if (appUser.restaurant) {
          const appUserRestaurant =
            (await RestaurantRepository.getRestaurantByName(
              appUser.restaurant
            )) as Restaurant;

          const newAppUser = new AppUser(
            appUser.login,
            appUser.email,
            appUserPassword,
            appUser.role,
            appUserCreationDate,
            appUserRestaurant
          );

          await this.repository.save(newAppUser);
        }
      })
    );
  }

  static getUsers(): Promise<AppUser[]> {
    return this.repository.find();
  }

  static getUserById(id: string): Promise<AppUser | null> {
    const user = this.repository.findOneBy({ id });

    if (!user) {
      throw Error("Aucun utilisateur de correspond à cet id.");
    }

    return user;
  }

  static async createUser(
    login: string,
    email: string,
    password: string,
    role: string
  ): Promise<AppUser> {
    const createdAt = new Date();
    const user = new AppUser(login, email, hashSync(password), role, createdAt);
    return this.saveUser(user);
  }

  static async updateUser(
    id: string,
    login: string,
    email: string,
    role: string
  ): Promise<AppUser> {
    const updatedAt = new Date();
    const userToUpdate = await this.getUserById(id);

    if (!userToUpdate) throw Error("Aucun utilisateur ne correspond à cet id.");

    return this.repository.save({
      id: id,
      login: login,
      email: email,
      role: role,
      updatedAt: updatedAt,
    });
  }

  static async updateUserPassword(
    id: string,
    password: string
  ): Promise<AppUser> {
    const updatedAt = new Date();
    const userToUpdate = await this.getUserById(id);

    if (!userToUpdate) throw Error("Aucun utilisateur ne correspond à cet id.");

    return this.repository.save({
      id: id,
      hashedPassword: hashSync(password),
      updatedAt: updatedAt,
    });
  }

  static async deleteUser(id: string): Promise<AppUser> {
    const user = await this.getUserById(id);

    if (!user) {
      throw Error("Aucun utilisateur de correspond à cet id.");
    }

    await this.repository.remove(user);

    return user;
  }

  static async signIn(
    email: string,
    password: string
  ): Promise<{ user: AppUser; session: Session }> {
    const user = await this.findByEmailAddress(email);

    if (!user || !compareSync(password, user.hashedPassword)) {
      throw new Error(INVALID_CREDENTIALS_ERROR_MESSAGE);
    }
    const session = await SessionRepository.createSession(user);

    return { user, session };
  }

  static async signOut(id: string): Promise<AppUser> {
    const user = await this.getUserById(id);

    if (!user) {
      throw Error("Aucun utilisateur de correspond à cet id.");
    }
    await SessionRepository.deleteSession(user);

    return user;
  }

  static async findBySessionId(sessionId: string): Promise<AppUser | null> {
    const session = await SessionRepository.findById(sessionId);

    if (!session) {
      return null;
    }

    return session.user;
  }
}
