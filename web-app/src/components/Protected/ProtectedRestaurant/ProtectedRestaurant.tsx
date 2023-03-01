import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROLE_RESTAURANT } from "../../../constants/Constants";
import { AppContext } from "../../../context/AppContext";
import { DASHBOARD_HOME, SIGN_IN_PATH } from "../../../pages/paths";

const ProtectedRestaurant = ({ children }: { children: any }) => {
  const appContext = useContext(AppContext);

  if (appContext?.loading) {
    return <div>Loading...</div>;
  }

  if (!appContext?.isAuthenticated) {
    toast.error(
      "Vous ne pouvez pas accéder à cette page. Merci de vous connecter."
    );
    appContext?.refetch();
    return <Navigate to={SIGN_IN_PATH} />;
  }

  if (appContext?.userData.role !== ROLE_RESTAURANT) {
    toast.error("Vous n'êtes pas autorisé à vous rendre sur cette page.");
    appContext?.refetch();
    return <Navigate to={DASHBOARD_HOME} />;
  }

  return children;
};

export default ProtectedRestaurant;
