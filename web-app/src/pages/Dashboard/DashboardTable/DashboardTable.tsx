import { useContext } from "react";
import "../DashboardTemp.scss";
import { AppContext } from "../../../context/AppContext";
import SVGLogo from "../../../components/SVG/SVGLogo/SVGLogo";
import { BIG_LOGO_DASHBOARD_SIZE } from "../../../constants/Constants";

const DashboardTable = () => {
  const userContext = useContext(AppContext);

  return (
    <div className="DashboardMain">
      <div className="DashboardContent">
        <SVGLogo
          logoWidth={BIG_LOGO_DASHBOARD_SIZE}
          logoHeight={BIG_LOGO_DASHBOARD_SIZE}
          logoFill={userContext?.userSVGColorScheme}
        />
        <h1>DASHBOARD TABLE</h1>
        <p className="DashboardText">Page Under Construction...</p>
        <p>Connecté avec l'adresse email : {userContext?.userData.email}</p>
      </div>
    </div>
  );
};

export default DashboardTable;
