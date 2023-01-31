import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HOME_PATH } from "../../pages/paths";

const Protected = ({
  userData,
  children,
}: {
  userData: any;
  children: any;
}) => {
  if (!userData.id) {
    toast.error("Vous ne pouvez pas accéder à cette page.");
    return <Navigate to={HOME_PATH} replace />;
  }
  return children;
};
export default Protected;
