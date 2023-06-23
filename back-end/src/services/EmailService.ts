import Mailjet from "node-mailjet";
import dotenv from "dotenv";
import Ticket from "../models/Ticket/Ticket.entity";
import Table from "../models/Table/Table.entity";
import AppUser from "../models/AppUser/AppUser.entity";

dotenv.config();

export default class EmailService {
  private static mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC || "",
    process.env.MJ_APIKEY_PRIVATE || ""
  );

  private static senderEmail = process.env.MJ_SENDER_EMAIL;
  private static senderName = process.env.MJ_SENDER_NAME;

  static async sendDeliveredTicketEmail(ticket: Ticket, table: Table) {
    if (ticket.email === process.env.MJ_AVAILABLE_EMAIL) {
      const templateId = parseInt(
        process.env.MJ_DELIVERED_TEMPLATE_ID as string
      );

      await this.mailjet
        .post("send", { version: "v3.1" })
        .request({
          Messages: [
            {
              From: {
                Email: this.senderEmail,
                Name: this.senderName,
              },
              To: [
                {
                  Email: ticket.email,
                  Name: ticket.name,
                },
              ],
              TemplateID: templateId,
              TemplateLanguage: true,
              Subject: "R'Ticket : Votre table est prête !",
              Variables: {
                ticketName: ticket.name,
                ticketNumber: ticket.number,
                ticketRestaurant: ticket.restaurant.name,
                tableNumber: table.number,
                ticketSeats: ticket.seats,
              },
            },
          ],
        })
        .then((result) => {
          console.log(result.body);
        })
        .catch((err) => {
          console.log(err.statusCode);
        });
    }
  }

  static async sendNewUserPasswordEmail(user: AppUser, link: string) {
    const templateId = parseInt(
      process.env.MJ_NEW_USER_PASSWORD_TEMPLATE_ID as string
    );

    await this.mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: this.senderEmail,
              Name: this.senderName,
            },
            To: [
              {
                Email: user.email,
                Name: `${user.firstname} ${user.lastname}`,
              },
            ],
            TemplateID: templateId,
            TemplateLanguage: true,
            Subject: "R'Ticket : Initialisation du mot de passe.",
            Variables: {
              userFirstname: user.firstname,
              userLastname: user.lastname,
              passwordLink: link,
            },
          },
        ],
      })
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  }

  static async sendResetPasswordEmail(user: AppUser, link: string) {
    const templateId = parseInt(
      process.env.MJ_RESET_PASSWORD_TEMPLATE_ID as string
    );

    await this.mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: this.senderEmail,
              Name: this.senderName,
            },
            To: [
              {
                Email: user.email,
                Name: `${user.firstname} ${user.lastname}`,
              },
            ],
            TemplateID: templateId,
            TemplateLanguage: true,
            Subject: "R'Ticket : Réinitialisation de votre mot de passe",
            Variables: {
              userFirstname: user.firstname,
              userLastname: user.lastname,
              passwordLink: link,
            },
          },
        ],
      })
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  }
}
