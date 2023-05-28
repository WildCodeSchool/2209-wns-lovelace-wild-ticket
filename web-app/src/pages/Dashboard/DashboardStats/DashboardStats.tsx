import { useContext } from "react";
import "./DashboardStats.scss";
import { AppContext } from "../../../context/AppContext";
import SVGLogo from "../../../components/SVG/SVGLogo/SVGLogo";
import { BIG_LOGO_DASHBOARD_SIZE } from "../../../constants/Constants";
import DashboardStatsGraph from "../../../components/Dashboard/DashboardStatsGraph/DashboardStatsGraph";
import DashboardStatsList from "../../../components/Dashboard/DashboardStatsList/DashboardStatsList";

const DashboardStats = () => {
  const appContext = useContext(AppContext);

  return appContext?.userData.role === "ROLE_ADMIN" ? (
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
  ) : (
    <section className="DashboardStatsSection">
      <DashboardStatsGraph />
      <div className="DashboardStatsSectionTabContainer">
        <DashboardStatsList />
      </div>
    </section>
  );
};

export default DashboardStats;
