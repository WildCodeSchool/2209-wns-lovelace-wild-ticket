import AppUser from "./AppUser.entity";
import SessionDb from "./Session.db";
import Session from "./Session.entity";

export default class SessionRepository extends SessionDb {
  public static async getSessions(): Promise<Session[] | null> {
    return await this.repository.find();
  }

  public static getSessionById(id: string): Promise<Session | null> {
    const session = this.repository.findOneBy({ id });

    if (!session) {
      throw new Error("Aucune session ne correspond à cet ID.");
    }

    return session;
  }

  public static createSession(user: AppUser): Promise<Session> {
    const createdAt = new Date();
    const session = new Session(user, createdAt);

    return this.saveSession(session);
  }

  public static async deleteSession(user: AppUser): Promise<Session> {
    const session = (await this.repository.findOne({
      where: { user: user },
      order: { createdAt: "DESC" },
    })) as Session;

    return this.removeSession(session);
  }
}
