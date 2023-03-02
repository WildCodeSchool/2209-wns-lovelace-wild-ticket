import Mailjet from "node-mailjet";
import dotenv from "dotenv";

dotenv.config();

export default class EmailService {
  private static mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC || "",
    process.env.MJ_APIKEY_PRIVATE || ""
  );

  private static senderEmail = process.env.MJ_SENDER_EMAIL;
  private static senderName = process.env.MJ_SENDER_NAME;

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
