import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { getErrorMessage } from "../../utils";
import { SIGN_IN_PATH } from "../paths";
import "react-toastify/dist/ReactToastify.css";
import {
  UpdateUserPasswordWithTokenMutation,
  UpdateUserPasswordWithTokenMutationVariables,
} from "../../gql/graphql";
import { UPDATE_USER_PASSWORD_WITH_TOKEN } from "../../queries/Queries";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [updateUserPasswordWithToken] = useMutation<
    UpdateUserPasswordWithTokenMutation,
    UpdateUserPasswordWithTokenMutationVariables
  >(UPDATE_USER_PASSWORD_WITH_TOKEN);

  // Get token from url
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token") || "";

  // State
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");

  const submit = async () => {
    try {
      if (newPassword !== newPasswordCheck) {
        toast.error(`Les mots de passe ne correspondent pas.`);
        return;
      }
      await updateUserPasswordWithToken({
        variables: { token: token, password: newPassword },
      });
      toast.success(
        `Votre mot de passe a été changé veuillez vous reconnecter avec votre identifiant et votre nouveau mot de passe.`
      );
      navigate(SIGN_IN_PATH);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>R'Ticket - Initialisation de votre mot de passe</title>
      </Helmet>
      <>
        <div className="signin-form-container">
          <h1>Réinitialisation de votre mot de passe</h1>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await submit();
            }}
          >
            <div className="signin-form-input">
              <label>Nouveau mot de passe</label>
              <input
                type="password"
                required
                id="new-password"
                name="email"
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              />
            </div>
            <div className="signin-form-input">
              <label>Vérification du mot de passe</label>
              <input
                type="password"
                required
                id="new-password-check"
                name="email"
                value={newPasswordCheck}
                onChange={(event) => {
                  setNewPasswordCheck(event.target.value);
                }}
              />
            </div>
            <button>Valider</button>
          </form>
        </div>
      </>
    </HelmetProvider>
  );
};

export default UpdatePassword;
