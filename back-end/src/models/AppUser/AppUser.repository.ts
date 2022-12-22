import AppUserDb from "./AppUser.db";
import AppUser from "./AppUser.entity";

import { hashSync, compareSync } from "bcryptjs";
import SessionRepository from "./Session.repository";
import Session from "./Session.entity";
import { ERROR_NO_USER_SIGNED_IN } from "./error-messages";

export default class AppUserRepository extends AppUserDb {
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
      throw new Error("Identifiants incorrects.");
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
