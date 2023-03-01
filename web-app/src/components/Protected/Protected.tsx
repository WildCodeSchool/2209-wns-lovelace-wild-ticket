import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import { SIGN_IN_PATH } from "../../pages/paths";

const Protected = ({ children }: { children: any }) => {
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

  return children;
};

export default Protected;
