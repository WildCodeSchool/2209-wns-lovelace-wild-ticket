import { randomBytes } from "crypto";

export default class PasswordService {
  static async generateRandomPassword(): Promise<string> {
    const randomPassword = randomBytes(10);
    return randomPassword.toString("hex");
  }
}
