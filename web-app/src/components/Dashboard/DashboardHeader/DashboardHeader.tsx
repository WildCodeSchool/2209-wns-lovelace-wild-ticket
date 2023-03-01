import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

import {
  HEADER_ICON_PARAMS,
  ROLE_ADMIN,
  ROLE_RESTAURANT,
} from "../../../constants/Constants";
import { convertDate } from "../../../services/DateService";
import SVGMiniIconUser from "../../SVG/SVGMiniIconUser/SVGMiniIconUser";
import { headerLocation } from "./utils";
import "./DashboardHeader.scss";
import SVGMiniIconTable from "../../SVG/SVGMiniIconTable/SVGMiniIconTable";

export default function DashBoardHeader() {
  const [dateToConvert, setDateToConvert] = useState<Date>(new Date());
  const [dateNow, setDateNow] = useState<{ date: string; time: string }>();
  const [dashboardLocation, setDashboardLocation] = useState<string>("Accueil");
  const location = useLocation().pathname;
  const appContext = useContext(AppContext);

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
        appContext?.userData.role === ROLE_RESTAURANT && (
          <div className="DashboardHeaderStatsContainer">
            <div className="HeaderStatsTextContainer">
              <SVGMiniIconUser iconParams={HEADER_ICON_PARAMS} />
              <p className="HeaderStats">7 Tickets</p>
            </div>
            <div className="HeaderStatsTextContainer">
              <SVGMiniIconTable iconParams={HEADER_ICON_PARAMS} />
              <p className="HeaderStats">13/15 Tables occupées</p>
            </div>
          </div>
        )
      }

      {
        //TODO: A voir si on rajoute des stats pour les admins
        appContext?.userData.role === ROLE_ADMIN && (
          <div className="DashboardHeaderStatsContainer">
            <div className="HeaderStatsTextContainer"></div>
            <div className="HeaderStatsTextContainer"></div>
          </div>
        )
      }
    </header>
  );
}
