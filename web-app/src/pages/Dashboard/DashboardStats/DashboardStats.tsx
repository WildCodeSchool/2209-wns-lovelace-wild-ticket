import { useContext } from "react";
import "./DashboardStats.scss";
import { AppContext } from "../../../context/AppContext";
import SVGLogo from "../../../components/SVG/SVGLogo/SVGLogo";
import { BIG_LOGO_DASHBOARD_SIZE } from "../../../constants/Constants";
import DashboardStatsGraph from "../../../components/Dashboard/DashboardStatsGraph/DashboardStatsGraph";
import DashboardStatsList from "../../../components/Dashboard/DashboardStatsList/DashboardStatsList";
import { GET_TICKETS_BY_RESTAURANT_TYPES } from "../../../types/DataTypes";

const DashboardStats = () => {
  const appContext = useContext(AppContext);
  const tickets = appContext?.tickets as GET_TICKETS_BY_RESTAURANT_TYPES;

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
        <DashboardStatsGraph data={tickets} />
      <div>
        <DashboardStatsList />
      </div>
    </section>
  );
};

export default DashboardStats;
