import { useContext } from "react";
import "../DashboardTemp.scss";
import { AppContext } from "../../../context/AppContext";
import SVGLogo from "../../../components/SVG/SVGLogo/SVGLogo";
import { BIG_LOGO_DASHBOARD_SIZE } from "../../../constants/Constants";

const DashboardOptions = () => {
  const appContext = useContext(AppContext);

  return (
    <div className="DashboardMain">
      <div className="DashboardContent">
        <SVGLogo
          logoWidth={BIG_LOGO_DASHBOARD_SIZE}
          logoHeight={BIG_LOGO_DASHBOARD_SIZE}
          logoFill={appContext?.userSVGColorScheme}
        />
        <h1>DASHBOARD OPTIONS</h1>
        <p className="DashboardText">Page Under Construction...</p>
        <p>Connecté avec l'adresse email : {appContext?.userData.email}</p>
      </div>
    </div>
  );
};

export default DashboardOptions;
