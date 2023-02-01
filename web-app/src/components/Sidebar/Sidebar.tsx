import { gql, useMutation } from "@apollo/client";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { SignOutMutation, SignOutMutationVariables } from "../../gql/graphql";
import { HOME_PATH } from "../../pages/paths";
import SVGIconTable from "../SVG/SVGIconeTable/SVGIconTable";
import SVGIconExit from "../SVG/SVGIconExit/SVGIconExit";
import SVGIconHome from "../SVG/SVGIconHome/SVGIconHome";
import SVGIconOptions from "../SVG/SVGIconOptions/SVGIconOptions";
import SVGIconPole from "../SVG/SVGIconPole/SVGIconPole";
import SVGIconRestaurant from "../SVG/SVGIconRestaurant/SVGIconRestaurant";
import SVGIconStats from "../SVG/SVGIconStats/SVGIconStats";
import SVGIconTicket from "../SVG/SVGIconTicket/SVGIconTicket";
import SVGIconUser from "../SVG/SVGIconUser/SVGIconUser";
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
  const userRole = userContext?.userData.role;

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
      <div>
        <SVGLogoMini logoWidth="55" logoFill="#f3f4f8" />
      </div>
      <div>
        <SVGIconHome iconWidth="30" iconFill="#f3f4f8" />
        {userRole === "ROLE_ADMIN" && (
          <div>
            <SVGIconRestaurant iconWidth="20" iconFill="#f3f4f8" />
            <SVGIconPole iconWidth="25" iconFill="#f3f4f8" />
            <SVGIconUser iconWidth="25" iconFill="#f3f4f8" />
          </div>
        )}
        {userRole === "ROLE_RESTAURANT" && (
          <div>
            <SVGIconTicket iconWidth="25" iconFill="#f3f4f8" />
            <SVGIconTable iconWidth="25" iconFill="#f3f4f8" />
          </div>
        )}
        <SVGIconStats iconWidth="25" iconFill="#f3f4f8" />
        <SVGIconOptions iconWidth="25" iconFill="#f3f4f8" />
        <SVGIconExit
          iconWidth="25"
          iconFill="#f3f4f6"
          userSignOut={userDisconnect}
        />
      </div>
    </aside>
  );
}
