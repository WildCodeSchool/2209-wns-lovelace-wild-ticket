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
import { MAX_ICON_PARAMS, MIN_ICON_PARAMS } from "../utils";
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
  //TODO: Voir si possibilité de transition lors du hover sur les icones.
  return (
    <aside className="SideBar">
      <div className="SideBarIconsContainer">
        <SVGLogoMini logoWidth="55" logoFill="#f3f4f8" />
      </div>
      <div className="SideBarIconsContainer">
        <SVGIconHome
          iconMaxParams={MAX_ICON_PARAMS}
          iconMinParams={MIN_ICON_PARAMS}
        />
        {userRole === "ROLE_ADMIN" && (
          <SVGIconRestaurant
            iconMaxParams={MAX_ICON_PARAMS}
            iconMinParams={MIN_ICON_PARAMS}
          />
        )}
        {userRole === "ROLE_ADMIN" && (
          <SVGIconPole
            iconMaxParams={MAX_ICON_PARAMS}
            iconMinParams={MIN_ICON_PARAMS}
          />
        )}
        {userRole === "ROLE_ADMIN" && (
          <SVGIconUser
            iconMaxParams={MAX_ICON_PARAMS}
            iconMinParams={MIN_ICON_PARAMS}
          />
        )}
        {userRole === "ROLE_RESTAURANT" && (
          <SVGIconTicket
            iconMaxParams={MAX_ICON_PARAMS}
            iconMinParams={MIN_ICON_PARAMS}
          />
        )}
        {userRole === "ROLE_RESTAURANT" && (
          <SVGIconTable
            iconMaxParams={MAX_ICON_PARAMS}
            iconMinParams={MIN_ICON_PARAMS}
          />
        )}
        <SVGIconStats
          iconMaxParams={MAX_ICON_PARAMS}
          iconMinParams={MIN_ICON_PARAMS}
        />
      </div>
      <div className="SideBarIconsContainer">
        <SVGIconOptions
          iconMaxParams={MAX_ICON_PARAMS}
          iconMinParams={MIN_ICON_PARAMS}
        />
        <SVGIconExit
          iconMaxParams={MAX_ICON_PARAMS}
          iconMinParams={MIN_ICON_PARAMS}
          userSignOut={userDisconnect}
        />
      </div>
    </aside>
  );
}
