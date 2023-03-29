import { useContext, useState } from "react";
import "../DashboardTemp.scss";
import { AppContext } from "../../../context/AppContext";
import SVGLogo from "../../../components/SVG/SVGLogo/SVGLogo";
import { BIG_LOGO_DASHBOARD_SIZE } from "../../../constants/Constants";

const DashboardHome = () => {
  const appContext = useContext(AppContext);
  const [dateNow, setDateNow] = useState<{ date: string; time: string }>();

  return (
    <div className="DashboardMain">
      <div className="DashboardContent">
        {/* <SVGLogo
          logoWidth={BIG_LOGO_DASHBOARD_SIZE}
          logoHeight={BIG_LOGO_DASHBOARD_SIZE}
          logoFill={appContext?.userSVGColorScheme}
        /> */}
        <p className="HeaderTime">zhgekhrmohrthjtmoujy</p>
        <h1>DASHBOARD HOME</h1>
        <p className="DashboardText">Page Under Construction...</p>
        <p>Connecté avec l'adresse email : {appContext?.userData.email}</p>
      </div>
    </div>
  );
};

export default DashboardHome;
