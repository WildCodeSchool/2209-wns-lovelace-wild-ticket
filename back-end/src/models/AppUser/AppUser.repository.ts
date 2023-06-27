import AppUserDb from "./AppUser.db";
import AppUser from "./AppUser.entity";
import { hashSync, compareSync } from "bcryptjs";
import SessionRepository from "./Session.repository";
import Session from "./Session.entity";
import RestaurantRepository from "../Restaurant/Restaurant.repository";
import Restaurant from "../Restaurant/Restaurant.entity";
import EmailService from "../../services/EmailService";
import PasswordService from "../../services/PasswordService";
import { randomBytes } from "crypto";

export const INVALID_CREDENTIALS_ERROR_MESSAGE = "Identifiants incorrects.";

export default class AppUserRepository extends AppUserDb {
  public static async getUsers(): Promise<AppUser[]> {
    return this.repository.find();
  }

  static async getUserById(id: string): Promise<AppUser | null> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new Error("Aucun utilisateur ne correspond à cet ID.");
    }

    return user;
  }

  public static async createUser(
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

  public static async updateUser(
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    role: string,
    restaurant: string
  ): Promise<AppUser> {
    await this.getUserById(id);

    const updatedAt = new Date();
    let userRestaurant = undefined;

    if (restaurant) {
      userRestaurant = (await RestaurantRepository.getRestaurantById(
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
      restaurant: userRestaurant,
    });
  }

  public static async deleteUser(id: string): Promise<AppUser | null> {
    const user = (await this.getUserById(id)) as AppUser;

    await this.repository.remove(user);

    return user;
  }

  public static async updateUserPassword(
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

  public static async updateUserPasswordWithToken(
    token: string,
    password: string
  ): Promise<AppUser> {
    // Check if token is valid and get user
    const userToUpdate = (await this.getUserByToken(token)) as AppUser;

    const userId = userToUpdate.id;
    const resetPasswordTokenExpiration =
      userToUpdate.resetPasswordTokenExpiration;

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

  public static async prepareAndSendResetPasswordEmail(
    email: string,
    state: string | null = null
  ): Promise<void> {
    // Check if user exists in database
    const user = (await this.getUserByEmailAddress(email)) as AppUser;

    if (email !== process.env.MJ_AVAILABLE_EMAIL) {
      return;
    }

    // Generate token
    const token = randomBytes(32).toString("hex");

    // Save token in database
    await this.setUserPasswordToken(user.id, token, state);

    // Construct email
    const link = `http://localhost:3000/update-password/?token=${token}`;

    // Send email
    state === "newUser"
      ? await EmailService.sendNewUserPasswordEmail(user, link)
      : await EmailService.sendResetPasswordEmail(user, link);
  }

  public static async signIn(
    email: string,
    password: string
  ): Promise<{ user: AppUser; session: Session }> {
    const user = (await this.getUserByEmailAddress(email)) as AppUser;

    if (!compareSync(password, user.hashedPassword)) {
      throw new Error(INVALID_CREDENTIALS_ERROR_MESSAGE);
    }

    const session = await SessionRepository.createSession(user);

    return { user, session };
  }

  public static async signOut(id: string): Promise<AppUser> {
    const user = (await this.getUserById(id)) as AppUser;

    await SessionRepository.deleteSession(user);

    return user;
  }
}
