import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { SIGN_IN_PATH } from "../../pages/paths";

const Protected = ({ children }: { children: any }) => {
  const userContext = useContext(UserContext);

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

  return children;
};

export default Protected;
