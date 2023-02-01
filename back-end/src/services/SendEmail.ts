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
            Email: "anthony.gouton@gmail.com",
            Name: "Anthony Gouton",
          },
        ],
        Subject: "Your email flight plan!",
        TextPart:
          "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
        HTMLPart:
          '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
      },
    ],
  });
};

export default sendResetPasswordEmail;
