import Mailjet from "node-mailjet";
import AppUserRepository from "../models/AppUser/AppUser.repository";

export default class EmailService {
  private static mailjet = Mailjet.apiConnect(
    "a080499f7f3eb1e0fd5c9d97a4b1802c",
    "210d2eda51630bbaaf4efdeca357f500"
  );

  private static senderEmail = "contact@r-ticket.agtn.fr";
  private static senderName = "R-Ticket";

  static async sendEmail(
    recipientEmail: string,
    recipientName: string,
    subject: string,
    text: string,
    html: string
  ) {
    await this.mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: this.senderEmail,
            Name: this.senderName,
          },
          To: [
            {
              Email: recipientEmail,
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
