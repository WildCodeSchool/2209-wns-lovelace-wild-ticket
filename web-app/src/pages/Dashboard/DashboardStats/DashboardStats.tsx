import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import "./DashboardStats.scss";
import { AppContext } from "../../../context/AppContext";
import SVGLogo from "../../../components/SVG/SVGLogo/SVGLogo";
import {
  BIG_LOGO_DASHBOARD_SIZE,
  ROLE_ADMIN,
} from "../../../constants/Constants";
import DashboardStatsGraph from "../../../components/Dashboard/DashboardStatsGraph/DashboardStatsGraph";
import DashboardStatsList from "../../../components/Dashboard/DashboardStatsList/DashboardStatsList";

const DashboardStats = () => {
  const appContext = useContext(AppContext);

  return ROLE_ADMIN.includes(appContext?.userData.role) ? (
    <>
      <Helmet>
        <title>R'Ticket - Statistiques</title>
      </Helmet>
      <section className="DashboardStatsSection">
        <div className="DashboardContent">
          <SVGLogo
            logoWidth={BIG_LOGO_DASHBOARD_SIZE}
            logoHeight={BIG_LOGO_DASHBOARD_SIZE}
            logoFill={appContext?.userSVGColorScheme}
          />
          <h1>DASHBOARD STATS</h1>
          <p className="DashboardText">Page Under Construction...</p>
          <p>Connecté avec l'adresse email : {appContext?.userData.email}</p>
        </div>
      </section>
    </>
  ) : (
    <>
      <Helmet>
        <title>R'Ticket - Statistiques</title>
      </Helmet>
      <section className="DashboardStatsSection">
        <DashboardStatsGraph />
        <div className="DashboardStatsSectionTabContainer">
          <DashboardStatsList />
        </div>
      </section>
    </>
  );
};

export default DashboardStats;
