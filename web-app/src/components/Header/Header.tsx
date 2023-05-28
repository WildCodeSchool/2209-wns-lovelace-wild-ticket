import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { headerLocation } from "./utils";
import "./Header.scss";
import {
  HEADER_ICON_PARAMS,
  ROLE_ADMIN,
  ROLE_RESTAURANT,
} from "../../constants/Constants";
import DateService from "../../services/DateService";
import SVGMiniIconUser from "../SVG/SVGMiniIconUser/SVGMiniIconUser";
import SVGMiniIconTable from "../SVG/SVGMiniIconTable/SVGMiniIconTable";
import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKETS_BY_RESTAURANT_TYPES,
} from "../../types/DataTypes";
import TableService from "../../services/TableService";
import TicketService from "../../services/TicketService";

export default function DashBoardHeader() {
  const [dateToConvert, setDateToConvert] = useState<Date>(new Date());
  const [dateNow, setDateNow] = useState<{ date: string; time: string }>();
  const [dashboardLocation, setDashboardLocation] = useState<string>("Accueil");
  const location = useLocation().pathname;
  const userRole = useContext(AppContext)?.userData.role;
  const tickets = useContext(AppContext)
    ?.tickets as GET_TICKETS_BY_RESTAURANT_TYPES;
  const tables = useContext(AppContext)
    ?.tables as GET_TABLES_BY_RESTAURANT_TYPES;

  // GET WAITING TICKETS COUNT
  const [waitingTickets, setWaitingTickets] = useState<number>(0);

  // GET OCCUPIED TABLES
  const [occupiedTables, setOccupiedTables] = useState<number>(0);

  useEffect(() => {
    setDashboardLocation(headerLocation(location));
    setWaitingTickets(TicketService.getCountOfWaitingTickets(tickets));
    setOccupiedTables(TableService.getCountOfOccupiedTables(tickets, tables));
    const setDateEachSecond = setInterval(() => {
      setDateToConvert(new Date());
      setDateNow(DateService.convertDateToDateAndTimeArray(dateToConvert));
    }, 1000);
    return () => {
      clearInterval(setDateEachSecond);
    };
  }, [dateToConvert, location, tables, tickets]);

  return (
    <header className="DashboardHeader">
      <div className="DashboardHeaderLocationContainer">
        <p className="HeaderLocation">{dashboardLocation}</p>
      </div>
      {dashboardLocation === "Accueil" ? (
        <div className="DashboardHeaderDateHomeContainer">
          <p className="HeaderDate">{dateNow?.date}</p>
        </div>
      ) : (
        <div className="DashboardHeaderDateContainer">
          <p className="HeaderDate">{dateNow?.date}</p>
          <p className="HeaderTime">{dateNow?.time}</p>
        </div>
      )}

      {
        //TODO: Insérer les vraies données de file d'attente
        userRole === ROLE_RESTAURANT && dashboardLocation === "Accueil" ? (
          ""
        ) : (
          <div className="DashboardHeaderStatsContainer">
            <div className="HeaderStatsTextContainer">
              <SVGMiniIconUser iconParams={HEADER_ICON_PARAMS} />
              <p className="HeaderStats">
                {waitingTickets} Ticket{waitingTickets > 1 ? "s" : ""} en
                attente
              </p>
            </div>
            <div className="HeaderStatsTextContainer">
              <SVGMiniIconTable iconParams={HEADER_ICON_PARAMS} />
              <p className="HeaderStats">
                {occupiedTables}/{tables?.length} Tables occupées
              </p>
            </div>
          </div>
        )
      }

      {
        //TODO: A voir si on rajoute des stats pour les admins
        userRole === ROLE_ADMIN && (
          <div className="DashboardHeaderStatsContainer">
            <div className="HeaderStatsTextContainer"></div>
            <div className="HeaderStatsTextContainer"></div>
          </div>
        )
      }
    </header>
  );
}
