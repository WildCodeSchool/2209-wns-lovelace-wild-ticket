import { useContext } from "react";
import "../DashboardTemp.scss";
import { AppContext } from "../../../context/AppContext";
import SVGLogo from "../../../components/SVG/SVGLogo/SVGLogo";
import { BIG_LOGO_DASHBOARD_SIZE } from "../../../constants/Constants";
import "./DashboardOptions.scss";

const DashboardOptions = () => {
  const appContext = useContext(AppContext);

  return appContext?.userData.role === "ROLE_ADMIN" ? (
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
  ) : (
    <section className="DashboardOptionsSection">
      <div className="DashboardOptionsContainer"><p>Config Resto</p></div>
      <div className="DashboardOptionsContainer"><p>Config Utilisateur</p></div>
      <div className="DashboardOptionsContainer"><p>Config Dashboard</p></div>
    </section>
  );
};

export default DashboardOptions;
