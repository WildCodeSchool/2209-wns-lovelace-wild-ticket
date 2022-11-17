import AppUserDb from "./AppUser.db";
import AppUser from "./AppUser.entity";

import { hashSync, compareSync } from "bcryptjs";
import SessionRepository from "./Session.repository";
import Session from "./Session.entity";
import { ERROR_NO_USER_SIGNED_IN } from "./error-messages";

export default class AppUserRepository extends AppUserDb {
  static createUser(
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string
  ): Promise<AppUser> {
    const user = new AppUser(
      firstName,
      lastName,
      emailAddress,
      hashSync(password)
    );
    return this.saveUser(user);
  }

  static async signIn(
    emailAddress: string,
    password: string
  ): Promise<{ user: AppUser; session: Session }> {
    const user = await this.findByEmailAddress(emailAddress);

    if (!user || !compareSync(password, user.hashedPassword)) {
      throw new Error("Identifiants incorrects.");
    }
    const session = await SessionRepository.createSession(user);
    return { user, session };
  }

  static async findBySessionId(sessionId: string): Promise<AppUser | null> {
    const session = await SessionRepository.findById(sessionId);
    if (!session) {
      return null;
    }
    return session.user;
  }
}
