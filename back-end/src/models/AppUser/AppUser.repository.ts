import AppUserDb from "./AppUser.db";
import AppUser from "./AppUser.entity";

import { hashSync, compareSync } from "bcryptjs";
import SessionRepository from "./Session.repository";
import Session from "./Session.entity";
import { AppUserFixtures } from "../../DataFixtures/AppUserFixtures";
import RestaurantRepository from "../Restaurant/Restaurant.repository";
import Restaurant from "../Restaurant/Restaurant.entity";
import EmailService from "../../services/EmailService";
import DateUpdates from "../../services/DateUpdates";

export const INVALID_CREDENTIALS_ERROR_MESSAGE = "Identifiants incorrects.";

export default class AppUserRepository extends AppUserDb {
  static async initializeAppUsers(
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

  static getUsers(): Promise<AppUser[]> {
    return this.repository.find();
  }

  static async getUserById(id: string): Promise<AppUser | null> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new Error("Aucun utilisateur ne correspond à cet ID.");
    }

    return user;
  }

  static async getUserByToken(
    resetPasswordToken: string
  ): Promise<AppUser | null> {
    const user = await this.findOneByResetPasswordToken(resetPasswordToken);

    if (!user) {
      throw new Error("Aucun utilisateur ne correspond à ce token.");
    }

    return user;
  }

  static async getUserByEmailAddress(email: string): Promise<AppUser | null> {
    const user = await this.findByEmailAddress(email);

    if (!user) {
      throw new Error("Aucun utilisateur correspond à cet email.");
    }

    return user;
  }

  static async createUser(
    email: string,
    password: string,
    role: string,
    restaurant: string
  ): Promise<AppUser> {
    const createdAt = new Date();
    let appUserRestaurant = undefined;

    if (restaurant) {
      appUserRestaurant = (await RestaurantRepository.getRestaurantById(
        restaurant
      )) as Restaurant;
    }

    const newAppUser = new AppUser(
      email,
      password,
      role,
      createdAt,
      appUserRestaurant
    );

    return await this.repository.save(newAppUser);
  }

  static async updateUser(
    id: string,
    email: string,
    role: string,
    restaurant: string
  ): Promise<AppUser> {
    const userToUpdate = await this.getUserById(id);

    const updatedAt = new Date();
    let appUserRestaurant = undefined;

    if (restaurant) {
      appUserRestaurant = (await RestaurantRepository.getRestaurantById(
        restaurant
      )) as Restaurant;
    }

    return this.repository.save({
      id: id,
      email: email,
      role: role,
      updatedAt: updatedAt,
      restaurant: appUserRestaurant,
    });
  }

  static async updateUserPassword(
    id: string,
    password: string,
    newPassword: string
  ): Promise<AppUser> {
    const userToUpdate = (await this.getUserById(id)) as AppUser;

    if (!compareSync(password, userToUpdate.hashedPassword)) {
      throw new Error("Votre ancien mot de passe est incorrect.");
    }

    const updatedAt = new Date();

    return this.repository.save({
      id: id,
      hashedPassword: hashSync(newPassword),
      updatedAt: updatedAt,
    });
  }

  static async updateUserPasswordWithToken(
    token: string,
    password: string
  ): Promise<AppUser> {
    // Check if token is valid and get user
    const userToUpdate = await this.getUserByToken(token);

    let userId = "";
    let resetPasswordTokenExpiration = null;
    if (userToUpdate) {
      userId = userToUpdate.id;
      resetPasswordTokenExpiration = userToUpdate.resetPasswordTokenExpiration;
    }

    // Check if token is expired
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
      id: userId,
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

    // Token expiration date set to 30 minutes
    const resetPasswordTokenExpiration = DateUpdates.addMinutesToDate(
      new Date(),
      30
    );

    return this.repository.save({
      id: id,
      resetPasswordToken: resetPasswordToken,
      resetPasswordTokenExpiration: resetPasswordTokenExpiration,
    });
  }

  static async deleteUser(id: string): Promise<AppUser | null> {
    const user = await this.getUserById(id);

    if (user) {
      await this.repository.remove(user);
      return user;
    }
    return null;
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

    if (user) {
      await SessionRepository.deleteSession(user);
    }
    return user as AppUser;
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

    let userId = "";
    if (user) {
      userId = user.id;
    }

    // Generate token
    const crypto = require("crypto");
    const token = crypto.randomBytes(32).toString("hex");
    // Save token in database
    await this.updateUserToken(userId, token);

    // Construct email
    const subject = "Réinitialisation de votre mot de passe";
    const link = `http://localhost:3000/update-password/?token=${token}`;
    const text = `Bonjour,\n\nPour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.\n\n${link}`;
    const html = `<p>Bonjour,<br /><br />Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.<br /><br /><a href="${link}">${link}</a></a></p>`;
    // Send email
    await EmailService.sendEmail(email, subject, text, html);
  }
}
