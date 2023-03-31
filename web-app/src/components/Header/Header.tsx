import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./Header.scss";
import {
  HEADER_ICON_PARAMS,
  ROLE_ADMIN,
  ROLE_RESTAURANT,
  TICKET_DISAPPEAR_DELAY,
} from "../../constants/Constants";
import { addMinutesToDate, convertDate } from "../../services/DateService";
import SVGMiniIconUser from "../SVG/SVGMiniIconUser/SVGMiniIconUser";
import { headerLocation } from "./utils";
import SVGMiniIconTable from "../SVG/SVGMiniIconTable/SVGMiniIconTable";
import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKETS_BY_RESTAURANT_TYPES,
} from "../../types/DataTypes";

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

  const getCountOfWaitingTickets = (
    tickets: GET_TICKETS_BY_RESTAURANT_TYPES
  ) => {
    const waitingTickets = tickets?.filter(
      (ticket) =>
        ticket.placedAt === null &&
        ((ticket.deliveredAt !== null &&
          addMinutesToDate(new Date(ticket.closedAt), TICKET_DISAPPEAR_DELAY) >
            new Date()) ||
          ticket.closedAt === null)
    ) as GET_TICKETS_BY_RESTAURANT_TYPES;
    return waitingTickets?.length;
  };

  // GET OCCUPIED TABLES
  const [occupiedTables, setOccupiedTables] = useState<number>(0);

  const getEmptyTables = (
    tickets: GET_TICKETS_BY_RESTAURANT_TYPES,
    tables: GET_TABLES_BY_RESTAURANT_TYPES
  ): number => {
    const placedTickets: (number | undefined)[] = [];
    const emptyTables: GET_TABLES_BY_RESTAURANT_TYPES = [];

    tickets
      ?.filter((ticket) => new Date(ticket.closedAt) > new Date())
      .map((ticket) => placedTickets.push(ticket.table?.number));

    tables
      ?.filter((table) => placedTickets?.includes(table.number))
      .map((table) => emptyTables.push(table));

    return emptyTables.length;
  };

  useEffect(() => {
    setDashboardLocation(headerLocation(location));
    setWaitingTickets(getCountOfWaitingTickets(tickets) as number);
    setOccupiedTables(getEmptyTables(tickets, tables) as number);
    const setDateEachSecond = setInterval(() => {
      setDateToConvert(new Date());
      setDateNow(convertDate(dateToConvert));
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
       <div className="DashboardHeaderDateContainer">
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
         userRole === ROLE_RESTAURANT && dashboardLocation === "Accueil" ?  "" : <div className="DashboardHeaderStatsContainer">
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
