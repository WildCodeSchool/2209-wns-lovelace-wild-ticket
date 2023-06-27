import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Session from "./Session.entity";

export default class SessionDb {
  protected static repository: Repository<Session>;

  public static async initializeRepository() {
    this.repository = await getRepository(Session);
  }

  public static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }

  protected static saveSession(session: Session): Promise<Session> {
    return this.repository.save(session);
  }

  protected static removeSession(session: Session): Promise<Session> {
    return this.repository.remove(session);
  }
}
