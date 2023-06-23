import { useContext } from "react";
import "../DashboardTemp.scss";
import { AppContext } from "../../../context/AppContext";
import SVGLogo from "../../../components/SVG/SVGLogo/SVGLogo";
import {
  BIG_LOGO_DASHBOARD_SIZE,
  ROLE_ADMIN,
} from "../../../constants/Constants";
import "./DashboardOptions.scss";
import "primeicons/primeicons.css";
import DashboardOptionsRestaurantForm from "../../../components/Dashboard/DashboardOptions/DashboardOptionsRestaurantForm/DashboardOptionsRestaurantForm";
import DashboardOptionsOperatorForm from "../../../components/Dashboard/DashboardOptions/DashboardOptionsOperatorForm/DashboardOptionsOperatorForm";
import DashboardOptionsGeneralOpForm from "../../../components/Dashboard/DashboardOptions/DashboardOptionsGeneralOpForm/DashboardOptionsGeneralOpForm";

const DashboardOptions = () => {
  const appContext = useContext(AppContext);

  return ROLE_ADMIN.includes(appContext?.userData.role) ? (
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
      <DashboardOptionsRestaurantForm />
      <DashboardOptionsOperatorForm />
      <DashboardOptionsGeneralOpForm />
    </section>
  );
};

export default DashboardOptions;
