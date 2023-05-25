import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineConfirmationNumber, MdOutlineTableBar } from "react-icons/md";
import { AppContext } from "../../../context/AppContext";
import { addMinutesToDate } from "../../../services/DateService";
import Clock from "../../../components/Clock/Clock";
import OpenCloseTime from "../../../components/OpenCloseTime/OpenCloseTime";

import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKETS_BY_RESTAURANT_TYPES,
} from "../../../types/DataTypes";
import {
  BIG_LOGO_DASHBOARD_SIZE,
  TICKET_DISAPPEAR_DELAY,
} from "../../../constants/Constants";
import {
  DASHBOARD_STATS,
  DASHBOARD_TABLE,
  DASHBOARD_TICKET,
} from "../../paths";

import "../DashboardTemp.scss";
import "../DashboardHome/DashboardHome.scss";
import SVGLogo from "../../../components/SVG/SVGLogo/SVGLogo";

const DashboardHome = () => {
  const appContext = useContext(AppContext);
  const userData = appContext?.userData;
  const navigate = useNavigate();
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
    setWaitingTickets(getCountOfWaitingTickets(tickets) as number);
    setOccupiedTables(getEmptyTables(tickets, tables) as number);
  }, [tables, tickets]);

  const goToStats = () => {
    navigate(DASHBOARD_STATS);
  };

  const goToTickets = () => {
    navigate(DASHBOARD_TICKET);
  };

  const goToTables = () => {
    navigate(DASHBOARD_TABLE);
  };

  return appContext?.userData.role === "ROLE_ADMIN" ? (
    <div className="DashboardMain">
      <div className="DashboardContent">
        <SVGLogo
          logoWidth={BIG_LOGO_DASHBOARD_SIZE}
          logoHeight={BIG_LOGO_DASHBOARD_SIZE}
          logoFill={appContext?.userSVGColorScheme}
        />
        <h1>DASHBOARD HOME</h1>
        <p className="DashboardText">Page Under Construction...</p>
        <p>Connecté avec l'adresse email : {appContext?.userData.email}</p>
      </div>
    </div>
  ) : (
    <section className="DashboardHomeSection">
      <div className="DashboardHomeTopContent">
        <div className="DashboardHomeTopLeftContainer">
          <div className="boxStatsTickets" onClick={goToTickets}>
            <div className="statsTickets">
              <span>{waitingTickets}</span>
              <p>Ticket{waitingTickets > 1 ? "s" : ""} en attente</p>
            </div>
            <MdOutlineConfirmationNumber className="icon" />
          </div>
          <button className="btnStats" onClick={goToTables}>
            Tables
          </button>
        </div>
        <div className="DashboardHomeTopMiddleContainer">
          <img
            className="DashboardHomeTopMiddleRestaurantLogo"
            src={userData.restaurant.picture}
            alt="restaurant logo"
          />
          <Clock></Clock>
        </div>
        <div className="DashboardHomeTopRightContainer">
          <div className="boxStatsTables" onClick={goToTickets}>
            <div className="statsTables">
              <span> {occupiedTables}</span>
              <p>Tables occupées</p>
            </div>
            <MdOutlineTableBar className="icon" />
          </div>
          <button className="btnStats" onClick={goToStats}>
            Statistiques
          </button>
        </div>
      </div>
      <div className="DashboardHomeBottomContent">
        <OpenCloseTime></OpenCloseTime>
      </div>
    </section>
  );
};

export default DashboardHome;
