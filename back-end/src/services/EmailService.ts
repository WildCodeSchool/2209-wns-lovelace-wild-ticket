import Mailjet from "node-mailjet";
import AppUserRepository from "../models/AppUser/AppUser.repository";

export default class EmailService {
  private static mailjet = Mailjet.apiConnect(
    "a080499f7f3eb1e0fd5c9d97a4b1802c",
    "210d2eda51630bbaaf4efdeca357f500"
  );

  private static senderEmail = "contact@r-ticket.agtn.fr";
  private static senderName = "R-Ticket";

  static async sendResetPasswordEmail(email: string) {
    // Check if email exists in database
    const user = await AppUserRepository.getUserByEmailAddress(email);
    if (!user) {
      throw new Error("Aucun utilisateur ne correspond à cet email.");
    }

    // Generate token
    const recipientName = user.login;
    const crypto = require("crypto");
    const token = crypto.randomBytes(32).toString("hex");

    // Send email
    const link = `http://localhost:3000/reset-password/${token}`;
    const subject = "Réinitialisation de votre mot de passe";
    const text = `Bonjour ${recipientName},\n\nPour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.\n\n${link}`;
    const html = `<p>Bonjour ${recipientName},<br /><br />Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.<br /><br /><a href="${link}">${link}</a></a></p>`;

    await this.mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: this.senderEmail,
            Name: this.senderName,
          },
          To: [
            {
              Email: email,
              Name: recipientName,
            },
          ],
          Subject: subject,
          TextPart: text,
          HTMLPart: html,
        },
      ],
    });
  }
}
