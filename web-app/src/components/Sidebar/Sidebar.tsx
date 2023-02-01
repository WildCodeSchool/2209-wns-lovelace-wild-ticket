import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { SignOutMutation, SignOutMutationVariables } from "../../gql/graphql";
import { HOME_PATH } from "../../pages/paths";
import SVGIconExit from "../SVG/SVGIconExit/SVGIconExit";
import SVGLogoMini from "../SVG/SVGLogoMini/SVGLogoMini";
import "./Sidebar.scss";

const SIGN_OUT = gql`
  mutation SignOut($signOutId: String!) {
    signOut(id: $signOutId) {
      id
    }
  }
`;

export default function SideBar() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

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

  const userDisconnect = async () => {
    signOut({
      variables: {
        signOutId: userContext?.userData.id,
      },
    });
  };

  return (
    <aside>
      <SVGLogoMini logoWidth="60" logoFill="#f3f4f6" />
      <SVGIconExit
        iconWidth="35"
        iconFill="#f3f4f6"
        userSignOut={userDisconnect}
      />
    </aside>
  );
}
