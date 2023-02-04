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
import EmailService from "../../services/EmailService";

export const INVALID_CREDENTIALS_ERROR_MESSAGE = "Identifiants incorrects.";

export default class AppUserRepository extends AppUserDb {
  static async initializeAppUsers(
    AppUserFixtures: AppUserFixtures[]
  ): Promise<void> {
    await Promise.all(
      AppUserFixtures.map(async (appUser) => {
        const appUserPassword = hashSync(appUser.password);
        const appUserCreationDate = new Date(appUser.createdAt);
        let appUserPoles = [];
        let appUserRestaurant = undefined;

        if (appUser.poles) {
          for (const pole of appUser.poles) {
            appUserPoles.push(
              (await PoleRepository.getPoleByName(pole)) as Pole
            );
          }
        }

        if (appUser.restaurant) {
          appUserRestaurant = (await RestaurantRepository.getRestaurantByName(
            appUser.restaurant
          )) as Restaurant;
        }

        const newAppUser = new AppUser(
          appUser.login,
          appUser.email,
          appUserPassword,
          appUser.role,
          appUserCreationDate,
          appUserRestaurant,
          appUserPoles
        );

        await this.repository.save(newAppUser);
      })
    );
  }

  static getUsers(): Promise<AppUser[]> {
    return this.repository.find();
  }

  static getUserById(id: string): Promise<AppUser | null> {
    const user = this.repository.findOneBy({ id });

    if (!user) {
      throw new Error("Aucun utilisateur ne correspond à cet id.");
    }

    return user;
  }

  static getUserByToken(resetPasswordToken: string): Promise<AppUser | null> {
    const user = this.findOneByResetPasswordToken(resetPasswordToken);

    if (!user) {
      throw new Error("Aucun utilisateur ne correspond à ce token.");
    }

    return user;
  }

  static getUserByEmailAddress(email: string): Promise<AppUser | null> {
    const user = this.findByEmailAddress(email);

    if (!user) {
      throw new Error("Aucun utilisateur correspond à cet email.");
    }

    return user;
  }

  static async createUser(
    login: string,
    email: string,
    password: string,
    role: string,
    poles: string[],
    restaurant: string
  ): Promise<AppUser> {
    const createdAt = new Date();
    let appUserPoles = [];
    let appUserRestaurant = undefined;

    if (poles) {
      for (const pole of poles) {
        appUserPoles.push((await PoleRepository.getPoleById(pole)) as Pole);
      }
    }

    if (restaurant) {
      appUserRestaurant = (await RestaurantRepository.getRestaurantById(
        restaurant
      )) as Restaurant;
    }

    const newAppUser = new AppUser(
      login,
      email,
      password,
      role,
      createdAt,
      appUserRestaurant,
      appUserPoles
    );

    return await this.repository.save(newAppUser);
  }

  static async updateUser(
    id: string,
    login: string,
    email: string,
    role: string,
    poles: string[],
    restaurant: string
  ): Promise<AppUser> {
    const userToUpdate = await this.getUserById(id);

    if (!userToUpdate) {
      throw new Error("Aucun utilisateur ne correspond à cet ID.");
    }

    const updatedAt = new Date();
    let appUserPoles = [];
    let appUserRestaurant = undefined;

    if (poles) {
      for (const pole of poles) {
        appUserPoles.push((await PoleRepository.getPoleById(pole)) as Pole);
      }
    }

    if (restaurant) {
      appUserRestaurant = (await RestaurantRepository.getRestaurantById(
        restaurant
      )) as Restaurant;
    }

    return this.repository.save({
      id: id,
      login: login,
      email: email,
      role: role,
      updatedAt: updatedAt,
      poles: appUserPoles,
      restaurant: appUserRestaurant,
    });
  }

  static async updateUserPassword(
    id: string,
    password: string
  ): Promise<AppUser> {
    const userToUpdate = await this.getUserById(id);

    if (!userToUpdate) {
      throw new Error("Aucun utilisateur ne correspond à cet ID.");
    }

    const updatedAt = new Date();

    return this.repository.save({
      id: id,
      hashedPassword: hashSync(password),
      updatedAt: updatedAt,
    });
  }

  static async updateUserPasswordWithToken(
    token: string,
    password: string
  ): Promise<AppUser> {
    // Check if token is valid
    const userToUpdate = await this.getUserByToken(token);
    if (!userToUpdate) {
      throw new Error("Aucun utilisateur ne correspond à ce token.");
    }

    // Check if token is expired
    const resetPasswordTokenExpiration =
      userToUpdate.resetPasswordTokenExpiration;
    if (!resetPasswordTokenExpiration) {
      throw new Error("Ce token n'est pas valide.");
    }
    if (resetPasswordTokenExpiration < new Date()) {
      throw new Error("Ce token a expiré.");
    }

    // Reset expiration date
    const newResetPasswordTokenExpiration = new Date();

    // Update user updatedAt
    const updatedAt = new Date();

    // Save user
    return this.repository.save({
      id: userToUpdate.id,
      hashedPassword: hashSync(password),
      updatedAt: updatedAt,
      resetPasswordTokenExpiration: newResetPasswordTokenExpiration,
    });
  }

  static async updateUserToken(
    id: string,
    resetPasswordToken: string
  ): Promise<AppUser> {
    const userToUpdate = await this.getUserById(id);

    if (!userToUpdate) {
      throw new Error("Aucun utilisateur ne correspond à cet ID.");
    }

    // Token expiration date set to 30 minutes
    const resetPasswordTokenExpiration = new Date(Date.now() + 1000 * 60 * 30);

    return this.repository.save({
      id: id,
      resetPasswordToken: resetPasswordToken,
      resetPasswordTokenExpiration: resetPasswordTokenExpiration,
    });
  }

  static async deleteUser(id: string): Promise<AppUser> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error("Aucun utilisateur ne correspond à cet ID.");
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
      throw new Error("Aucun utilisateur ne correspond à cet id.");
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

  static async sendResetPasswordEmail(email: string): Promise<void> {
    // Check if email exists in database
    const user = await this.getUserByEmailAddress(email);
    if (!user) {
      throw new Error("Aucun utilisateur ne correspond à cet email.");
    }

    // Generate token
    const crypto = require("crypto");
    const token = crypto.randomBytes(32).toString("hex");
    // Save token in database
    await this.updateUserToken(user.id, token);

    // Construct email
    const recipientName = user.login;
    const subject = "Réinitialisation de votre mot de passe";
    const link = `http://localhost:3000/update-password/?token=${token}`;
    const text = `Bonjour ${recipientName},\n\nPour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.\n\n${link}`;
    const html = `<p>Bonjour ${recipientName},<br /><br />Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.<br /><br /><a href="${link}">${link}</a></a></p>`;
    // Send email
    await EmailService.sendEmail(email, recipientName, subject, text, html);
  }
}
