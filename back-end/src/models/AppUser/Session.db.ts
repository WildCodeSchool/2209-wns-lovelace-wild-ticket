import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Session from "./Session.entity";

export default class SessionDb {
  static repository: Repository<Session>;

  static async initializeRepository() {
    this.repository = await getRepository(Session);
  }

  protected static saveSession(session: Session): Promise<Session> {
    return this.repository.save(session);
  }

  protected static removeSession(session: Session): Promise<Session> {
    return this.repository.remove(session);
  }

  static async clearRepository(): Promise<void> {
    this.repository.delete({});
  }
}
