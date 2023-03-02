import AppUser from "./AppUser.entity";
import SessionDb from "./Session.db";
import Session from "./Session.entity";

export default class SessionRepository extends SessionDb {
  static createSession(user: AppUser): Promise<Session> {
    const createdAt = new Date();
    const session = new Session(user, createdAt);

    return this.saveSession(session);
  }

  static async deleteSession(user: AppUser): Promise<Session> {
    const session = (await this.repository.findOne({
      where: { user: user },
      order: { createdAt: "DESC" },
    })) as Session;

    return this.removeSession(session);
  }

  static findById(id: string): Promise<Session | null> {
    return this.repository.findOneBy({ id });
  }
}
