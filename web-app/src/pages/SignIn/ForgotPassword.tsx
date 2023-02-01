import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { SignInMutation, SignInMutationVariables } from "../../gql/graphql";
import { getErrorMessage } from "../../utils";
import { HOME_PATH } from "../paths";
import "react-toastify/dist/ReactToastify.css";

const sendEmail = () => {
  const mailjet = require("node-mailjet").connect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "$SENDER_EMAIL",
          Name: "Me",
        },
        To: [
          {
            Email: "$RECIPIENT_EMAIL",
            Name: "You",
          },
        ],
        Subject: "My first Mailjet Email!",
        TextPart: "Greetings from Mailjet!",
        HTMLPart:
          '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
      },
    ],
  });
  request
    .then((result: { body: any }) => {
      console.log(result.body);
    })
    .catch((err: { statusCode: any }) => {
      console.log(err.statusCode);
    });
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = () => {
    sendEmail();
    setEmailSent(true);
  };

  return (
    <>
      <div className="signin-form-container">
        <h1>ForgotPassword</h1>
        <form>
          <div className="signin-form-input">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button onClick={handleSendEmail}>
            Réinitialiser le mot de passe
          </button>
          {emailSent && <p>Réinitialiser le mot de passe</p>}
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
