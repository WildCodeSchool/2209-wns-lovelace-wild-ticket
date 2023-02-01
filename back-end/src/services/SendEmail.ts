import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  "a080499f7f3eb1e0fd5c9d97a4b1802c",
  "210d2eda51630bbaaf4efdeca357f500"
);

const sendResetPasswordEmail = async (email: string) => {
  await mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "contact@r-ticket.agtn.fr",
          Name: "R-Ticket",
        },
        To: [
          {
            Email: "anthony@r-ticket.agtn.fr",
            Name: "Anthony Gouton",
          },
        ],
        Subject: "Réinitialisation de votre mot de passe",
        TextPart:
          "Bonjour, pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.",
        HTMLPart:
          '<p>Bonjour,<br /><br />Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.<br /><br />Ici le lien</p>',
      },
    ],
  });
};

export default sendResetPasswordEmail;
