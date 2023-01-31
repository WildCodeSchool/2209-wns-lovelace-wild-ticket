import React from "react";
import "./Dashboard.scss";
import logoLightBig from "../../assets/logos/r-ticket-light-big.png";
import { gql, useMutation } from "@apollo/client";
import { SignOutMutation, SignOutMutationVariables } from "../../gql/graphql";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../paths";

const SIGN_OUT = gql`
  mutation SignOut($signOutId: String!) {
    signOut(id: $signOutId) {
      id
    }
  }
`;

const Dashboard = ({
  userData,
  onSuccess,
}: {
  userData: any;
  onSuccess: () => {};
}) => {
  const navigate = useNavigate();

  const [signOut] = useMutation<SignOutMutation, SignOutMutationVariables>(
    SIGN_OUT,
    {
      onCompleted: () => {
        toast.success("Vous êtes déconnecté.");
        onSuccess();
        //TODO: Voir pour supprimer les cookies dans le navigateur.
        navigate(HOME_PATH);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const handleDisconnect = async (user: any) => {
    signOut({
      variables: {
        signOutId: user.id,
      },
    });
  };

  return (
    <div className="DashboardMain">
      <div className="DashboardContent">
        <img className="DashboardLogo" src={logoLightBig} alt="Logo R'Ticket" />
        <p className="DashboardText">Page Under Construction...</p>
        <p>Connecté avec l'adresse email : {userData.email}</p>
        <button
          className="DashboardButton"
          onClick={() => {
            handleDisconnect(userData);
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
