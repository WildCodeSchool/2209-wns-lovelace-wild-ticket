import { useContext } from "react";
import "./DashboardStats.scss";
import { UserContext } from "../../../context/UserContext";
import SVGLogo from "../../../components/SVG/SVGLogo/SVGLogo";

const DashboardStats = () => {
  const userContext = useContext(UserContext);
  const logoSize = "500";

  return (
    <div className="DashboardMain">
      <div className="DashboardContent">
        <SVGLogo
          logoWidth={logoSize}
          logoHeight={logoSize}
          logoFill={userContext?.userSVGColorScheme}
        />
        <h1>DASHBOARD STATS</h1>
        <p className="DashboardText">Page Under Construction...</p>
        <p>Connecté avec l'adresse email : {userContext?.userData.email}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
