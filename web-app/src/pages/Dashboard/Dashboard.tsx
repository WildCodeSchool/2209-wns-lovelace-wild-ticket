import React, { useContext } from "react";
import "./Dashboard.scss";
import { gql, useMutation } from "@apollo/client";
import { SignOutMutation, SignOutMutationVariables } from "../../gql/graphql";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "../paths";
import { UserContext } from "../../context/UserContext";
import SVGLogo from "../../components/SVG/SVGLogo/SVGLogo";

const SIGN_OUT = gql`
  mutation SignOut($signOutId: String!) {
    signOut(id: $signOutId) {
      id
    }
  }
`;

const Dashboard = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const logoSize = "500";

  const [signOut] = useMutation<SignOutMutation, SignOutMutationVariables>(
    SIGN_OUT,
    {
      onCompleted: () => {
        toast.success("Vous êtes déconnecté.");
        userContext?.refetch();
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
        <SVGLogo
          logoWidth={logoSize}
          logoHeight={logoSize}
          logoFill={userContext?.userSVGColorScheme}
        />
        <p className="DashboardText">Page Under Construction...</p>
        <p>Connecté avec l'adresse email : {userContext?.userData.email}</p>
        <button
          className="DashboardButton"
          onClick={() => {
            handleDisconnect(userContext?.userData);
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
