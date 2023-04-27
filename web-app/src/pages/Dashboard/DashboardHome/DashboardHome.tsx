import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { MdOutlineConfirmationNumber, MdOutlineTableBar } from "react-icons/md";
import { AppContext } from "../../../context/AppContext";
import { addMinutesToDate, convertDate } from "../../../services/DateService";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";

import {
  UpdateRestaurantOpeningTimeMutation,
  UpdateRestaurantOpeningTimeMutationVariables,
} from "../../../gql/graphql";
import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKETS_BY_RESTAURANT_TYPES,
} from "../../../types/DataTypes";
import { TICKET_DISAPPEAR_DELAY } from "../../../constants/Constants";
import { DASHBOARD_STATS, DASHBOARD_TICKET } from "../../paths";
import { UPDATE_RESTAURANTS_TIME } from "../../../queries/Queries";

import "../DashboardTemp.scss";
import "../DashboardHome/DashboardHome.scss";


const DashboardHome = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [dateToConvert, setDateToConvert] = useState<Date>(new Date());
  const [dateNow, setDateNow] = useState<{ date: string; time: string }>();
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

  //UPDATE OPENING AND CLOSED TIME
  const [openAt, setOpenAt] = React.useState<Date | null>();
  const [closedAt, setClosedAt] = React.useState<Date | null>();
  const restaurantId = appContext?.userData.restaurant.id as string;

  let openHour = openAt?.getHours() as number;
  let openMinute = openAt?.getMinutes() as number;
  let closeHour = closedAt?.getHours() as number;
  let closeMinute = closedAt?.getMinutes() as number;

  if (openMinute === 0) {
    openMinute = 0o0;
  }

  if (closeMinute === 0) {
    closeMinute = 0o0;
  }
  console.log(openMinute);
  const [updateRestaurantOpeningTime] = useMutation<
    UpdateRestaurantOpeningTimeMutation,
    UpdateRestaurantOpeningTimeMutationVariables
  >(UPDATE_RESTAURANTS_TIME, {
    variables: {
      updateRestaurantOpeningTimeId: restaurantId,
      hourOpenAt: openHour,
      minutesOpenAt: openMinute,
      hourCloseAt: closeHour,
      minutesCloseAt: closeMinute,
    },
    onCompleted: async (data) => {
      setOpenAt(null);
      setClosedAt(null);
    },
    onError: () => {},
  });

  // useEffect(() => {
  //   setWaitingTickets(getCountOfWaitingTickets(tickets) as number);
  //   setOccupiedTables(getEmptyTables(tickets, tables) as number);
  //   const setDateEachSecond = setInterval(() => {
  //     setDateToConvert(new Date());
  //     setDateNow(convertDate(dateToConvert));
  //   }, 1000);
  //   return () => {
  //     clearInterval(setDateEachSecond);
  //   };
  // }, [dateToConvert, tables, tickets]);

  const goToStats = () => {
    navigate(DASHBOARD_STATS);
  };

  const goToTickets = () => {
    navigate(DASHBOARD_TICKET);
  };

  return (
    <div className="DashboardMain">
      <div className="DashboardContent">
        <div className="contentTop">
          <div className="statsTop">
            <p className="time">{dateNow?.time}</p>
            <button className="btnStats" onClick={goToStats}>
              Statistiques
            </button>
          </div>
          <div className="statsBottom">
            <div className="boxStatsTickets" onClick={goToTickets}>
              <div className="statsTickets">
                <span>{waitingTickets}</span>
                <p>Ticket{waitingTickets > 1 ? "s" : ""} en attente</p>
              </div>
              <MdOutlineConfirmationNumber className="icon" />
            </div>
            <div className="boxStatsTables" onClick={goToTickets}>
              <div className="statsTables">
                <span> {occupiedTables}</span>
                <p>Tables occupées</p>
              </div>
              <MdOutlineTableBar className="icon" />
            </div>
          </div>
        </div>
        <div className="contentBottom">
          <div className="open">
            <h2>Ouverture de la réservation</h2>
            <div className="field">
              <h3>
                {openHour}:{openMinute}
              </h3>
              <DatePicker
                id="clearValue"
                format="HH:mm"
                editable={true}
                ranges={[]}
                onOk={(open) => setOpenAt(open)}
                value={openAt}
                placement="auto"
                // placeholder=" "
                style={{ width: 260 }}
              />
            </div>
          </div>
          <div className="close">
            <h2>Fermeture de la réservation</h2>
            <div className="field">
              <h3>
                {closeHour}:{closeMinute}
              </h3>
              <DatePicker
                id="clearValue1"
                format="HH:mm"
                editable={true}
                ranges={[]}
                onChange={(close) => setClosedAt(close)}
                value={closedAt}
                placement="auto"
                // placeholder=" "
                style={{ width: 260 }}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            updateRestaurantOpeningTime();
          }}
        >
          Valider
        </button>
        <p>Connecté avec l'adresse email : {appContext?.userData.email}</p>
      </div>
    </div>
  );
};

export default DashboardHome;
