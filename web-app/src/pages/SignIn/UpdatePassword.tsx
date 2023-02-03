import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils";
import { HOME_PATH } from "../paths";
import "react-toastify/dist/ReactToastify.css";

const SEND_RESET_PASSWORD_EMAIL = gql`
  mutation SendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email)
  }
`;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [sendResetPasswordEmail] = useMutation(SEND_RESET_PASSWORD_EMAIL);

  const submit = async () => {
    try {
      await sendResetPasswordEmail({ variables: { email } });
      toast.success(`Un mail vient de vous être envoyé à l'adresse ${email}.`);
      navigate(HOME_PATH);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <div className="signin-form-container">
        <h1>Nouveau mot de passe</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await submit();
          }}
        >
          <div className="signin-form-input">
            <label>Adresse email</label>
            <input
              type="email"
              required
              autoComplete="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => {
                setemail(event.target.value);
              }}
            />
          </div>
          <button>Valider</button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
