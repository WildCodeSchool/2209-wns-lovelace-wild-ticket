import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROLE_ADMIN } from "../../../constants/Constants";
import { AppContext } from "../../../context/AppContext";
import { DASHBOARD_HOME, SIGN_IN_PATH } from "../../../pages/paths";

const ProtectedAdmin = ({ children }: { children: any }) => {
  const userContext = useContext(AppContext);

  if (userContext?.loading) {
    return <div>Loading...</div>;
  }

  if (!userContext?.isAuthenticated) {
    toast.error(
      "Vous ne pouvez pas accéder à cette page. Merci de vous connecter."
    );
    userContext?.refetch();
    return <Navigate to={SIGN_IN_PATH} />;
  }

  if (userContext?.userData.role !== ROLE_ADMIN) {
    toast.error("Vous n'êtes pas autorisé à vous rendre sur cette page.");
    userContext?.refetch();
    return <Navigate to={DASHBOARD_HOME} />;
  }

  return children;
};

export default ProtectedAdmin;
