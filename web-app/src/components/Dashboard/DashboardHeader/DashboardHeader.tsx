import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import {
  DASHBOARD_HOME,
  DASHBOARD_OPTIONS,
  DASHBOARD_POLE,
  DASHBOARD_RESTAURANT,
  DASHBOARD_STATS,
  DASHBOARD_TABLE,
  DASHBOARD_TICKET,
  DASHBOARD_USER,
} from "../../../pages/paths";
import convertDate from "../../../services/UseDate";
import SVGMiniIconTime from "../../SVG/SVGMiniIconTime/SVGMiniIconTime";
import SVGMiniIconUser from "../../SVG/SVGMiniIconUser/SVGMiniIconUser";

import "./DashboardHeader.scss";

export default function DashBoardHeader() {
  const [dateToConvert, setDateToConvert] = useState<Date>(new Date());
  const [dateNow, setDateNow] = useState<{ date: string; time: string }>();
  const [dashboardLocation, setDashboardLocation] = useState<string>("Accueil");
  const location = useLocation().pathname;
  const userContext = useContext(UserContext);

  const headerLocation = (location: string): string => {
    switch (location) {
      case DASHBOARD_HOME:
        return "Accueil";
      case DASHBOARD_OPTIONS:
        return "Configuration";
      case DASHBOARD_POLE:
        return "Pôles restaurateurs";
      case DASHBOARD_RESTAURANT:
        return "Restaurants";
      case DASHBOARD_STATS:
        return "Statistiques";
      case DASHBOARD_TABLE:
        return "Tables";
      case DASHBOARD_TICKET:
        return "File d'attente";
      case DASHBOARD_USER:
        return "Utilisateurs";
      default:
        return "Oups !";
    }
  };

  useEffect(() => {
    setDashboardLocation(headerLocation(location));
    const setDateEachSecond = setInterval(() => {
      setDateToConvert(new Date());
      setDateNow(convertDate(dateToConvert));
    }, 1000);
    return () => {
      clearInterval(setDateEachSecond);
    };
  }, [dateToConvert, location]);

  return (
    <header className="DashboardHeader">
      <div className="DashboardHeaderLocationContainer">
        <p className="HeaderLocation">{dashboardLocation}</p>
      </div>
      <div className="DashboardHeaderDateContainer">
        <p className="HeaderDate">{dateNow?.date}</p>
        <p className="HeaderTime">{dateNow?.time}</p>
      </div>

      {
        //TODO: Insérer les vraies données de file d'attente
        userContext?.userData.role === "ROLE_RESTAURANT" && (
          <div className="DashboardHeaderStatsContainer">
            <div className="HeaderStatsTextContainer">
              <SVGMiniIconUser />
              <p className="HeaderStats">7 tickets</p>
            </div>
            <div className="HeaderStatsTextContainer">
              <SVGMiniIconTime />
              <p className="HeaderStats">26min d'attente</p>
            </div>
          </div>
        )
      }

      {
        //TODO: A voir si on rajoute des stats pour les admins
        userContext?.userData.role === "ROLE_ADMIN" && (
          <div className="DashboardHeaderStatsContainer">
            <div className="HeaderStatsTextContainer"></div>
            <div className="HeaderStatsTextContainer"></div>
          </div>
        )
      }
    </header>
  );
}
