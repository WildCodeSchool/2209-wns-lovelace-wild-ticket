import { SyntheticEvent, useContext, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import "../DashboardOptionsForm.scss";
import "primeicons/primeicons.css";
import { AppContext } from "../../../../context/AppContext";
import {
  UpdateUserPasswordMutation,
  UpdateUserPasswordMutationVariables,
} from "../../../../gql/graphql";

import { UPDATE_USER_PASSWORD } from "../../../../queries/Queries";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";

const DashboardOptionsOperatorForm = () => {
  const appContext = useContext(AppContext);
  const userId = appContext?.userData.id;
  const [userPassword, setUserPassword] = useState<string>("");
  const [newUserPassword, setNewUserPassword] = useState<string>("");
  const [newUserPasswordConfirmation, setNewUserPasswordConfirmation] =
    useState<string>("");

  const [updatePassword] = useMutation<
    UpdateUserPasswordMutation,
    UpdateUserPasswordMutationVariables
  >(UPDATE_USER_PASSWORD, {
    notifyOnNetworkStatusChange: true,
    variables: {
      updateUserPasswordId: userId,
      password: userPassword,
      newUserPassword: newUserPassword,
    },
    onCompleted: () => {
      appContext?.refetch();
      toast.success("Mise à jour effectuée avec succès");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (newUserPassword !== newUserPasswordConfirmation) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    updatePassword();
  };

  return (
    <div className="DashboardOptionsContainer">
      <div className="DashboardOptionsTitleContainer">
        <i className="pi pi-user DashboardOptionsTitleIcon" />
        <p className="DashboardOptionsTitleText">Opérateur</p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="DashboardOptionsForm"
      >
        <div className="DashboardOptionsFormTextInputContainer">
          <label
            className="DashboardOptionsFormTextLabel"
            htmlFor="currentPassword"
          >
            Ancien mot de passe
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            className="DashboardOptionsFormTextInput"
            type="password"
            required
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <div className="DashboardOptionsFormTextInputContainer">
          <label
            style={{ marginBottom: "27px" }}
            className="DashboardOptionsFormTextLabel"
            htmlFor="newPassword"
          >
            Nouveau mot de passe
          </label>
          <div style={{ width: "60%" }}>
            <input
              id="newPassword"
              name="newPassword"
              style={{ width: "100%" }}
              className="DashboardOptionsFormTextInput"
              type="password"
              minLength={8}
              required
              onChange={(e) => setNewUserPassword(e.target.value)}
            />
            <PasswordStrengthBar password={newUserPassword} />
          </div>
        </div>
        <div className="DashboardOptionsFormTextInputContainer">
          <label
            className="DashboardOptionsFormTextLabel"
            htmlFor="newPasswordConfirm"
          >
            Confirmer mot de passe
          </label>
          <input
            id="newPasswordConfirm"
            name="newPasswordConfirm"
            className="DashboardOptionsFormTextInput"
            type="password"
            required
            onChange={(e) => setNewUserPasswordConfirmation(e.target.value)}
          />
        </div>

        <button className="DashboardOptionsFormButton" style={{ width: "20%" }}>
          Modifier
        </button>
        <div></div>
      </form>
    </div>
  );
};

export default DashboardOptionsOperatorForm;
