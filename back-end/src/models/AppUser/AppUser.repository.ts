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
import PasswordService from "../../services/PasswordService";

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
    firstname: string,
    lastname: string,
    email: string,
    role: string,
    restaurant: string
  ): Promise<AppUser> {
    const createdAt = new Date();

    const password =
      process.env.NODE_ENV === "test"
        ? "password"
        : await PasswordService.generateRandomPassword();

    let appUserRestaurant = undefined;

    if (restaurant) {
      appUserRestaurant = (await RestaurantRepository.getRestaurantById(
        restaurant
      )) as Restaurant;
    }

    const newAppUser = new AppUser(
      firstname,
      lastname,
      email,
      hashSync(password),
      role,
      createdAt,
      appUserRestaurant
    );

    const userCreated = await this.repository.save(newAppUser);

    userCreated &&
      (await this.prepareAndSendResetPasswordEmail(
        userCreated.email,
        "newUser"
      ));

    return userCreated;
  }

  static async updateUser(
    id: string,
    firstname: string,
    lastname: string,
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

    return await this.repository.save({
      id: id,
      firstname: firstname,
      lastname: lastname,
      email: email,
      role: role,
      updatedAt: updatedAt,
      restaurant: appUserRestaurant,
    });
  }

  static async prepareAndSendResetPasswordEmail(
    email: string,
    state: string | null = null
  ): Promise<void> {
    // Check if email exists in database
    const user = (await this.getUserByEmailAddress(email)) as AppUser;

    if (email !== process.env.MJ_AVAILABLE_EMAIL) {
      return;
    }

    // Generate token
    const crypto = require("crypto");
    const token = crypto.randomBytes(32).toString("hex");

    // Save token in database
    await this.setUserPasswordToken(user.id, token, state);

    // Construct email
    const link = `http://localhost:3000/update-password/?token=${token}`;

    // Send email
    state === "newUser"
      ? await EmailService.sendNewUserPasswordEmail(user, link)
      : await EmailService.sendResetPasswordEmail(user, link);
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

  static async setUserPasswordToken(
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
}
