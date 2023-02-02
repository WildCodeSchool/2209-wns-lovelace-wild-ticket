import Mailjet from "node-mailjet";

export default class EmailService {
  private static mailjet = Mailjet.apiConnect(
    "a080499f7f3eb1e0fd5c9d97a4b1802c",
    "210d2eda51630bbaaf4efdeca357f500"
  );

  private static senderEmail = "contact@r-ticket.agtn.fr";
  private static senderName = "R-Ticket";

  static async sendResetPasswordEmail(email: string) {
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
              Name: "Destinataire",
            },
          ],
          Subject: "Réinitialisation de votre mot de passe",
          TextPart:
            "Bonjour, pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.",
          HTMLPart:
            "<p>Bonjour,<br /><br />Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.<br /><br />Ici le lien</p>",
        },
      ],
    });
  }
}
