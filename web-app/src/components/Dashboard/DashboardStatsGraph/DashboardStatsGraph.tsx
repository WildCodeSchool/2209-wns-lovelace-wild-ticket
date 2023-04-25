import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { GET_TICKETS_BY_RESTAURANT_TYPES } from "../../../types/DataTypes";
import {
  countCurrentWeekTickets,
  countLastThirtyDaysTickets,
  countTodaysTicketsBySeat,
  lastThirtyDays,
} from "../../../services/StatsService";
import "./DashboardStatsGraph.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardStatsGraph = ({
  data,
}: {
  data: GET_TICKETS_BY_RESTAURANT_TYPES;
}) => {
  let labels = [];
  // Statistiques pour le nombre de tickets du jour par capacité de table.
  const arrayOfCountTodaysTicketsBySeat: number[] =
    countTodaysTicketsBySeat(data);

  const countTodaysTicketsBySeatOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Tickets du jour par capacité de table",
      },
    },
  };

  labels = ["2", "4", "6", "8"];

  const countTodaysTicketsBySeatDatas = {
    labels,
    datasets: [
      {
        label: "Total des tickets",
        data: arrayOfCountTodaysTicketsBySeat,
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
    ],
  };

  // Statistiques pour le total des tickets par jour de la semaine en cours.
  const arrayOfCountCurrentWeekTickets = countCurrentWeekTickets(data);

  const countCurrentWeekTicketsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Tickets par jour de la semaine en cours",
      },
    },
  };

  labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  const countCurrentWeekTicketsDatas = {
    labels,
    datasets: [
      {
        label: "Total des tickets",
        data: arrayOfCountCurrentWeekTickets,
        borderColor: "rgb(39, 97, 245)",
        backgroundColor: "rgba(39, 97, 245, 0.5)",
      },
    ],
  };

  // Statistiques pour le total des tickets pour les 30 derniers jours.
  const arrayOfLastThirtyDays = lastThirtyDays();
  const arrayOfCountThirtyDaysTickets = countLastThirtyDaysTickets(data);

  const lastThirtyDaysTicketsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Tickets par jour sur les 30 derniers jours",
      },
    },
  };

  labels = arrayOfLastThirtyDays;

  const lastThirtyDaysTicketsDatas = {
    labels,
    datasets: [
      {
        label: "Total des tickets",
        data: arrayOfCountThirtyDaysTickets,
        borderColor: "rgb(0, 205, 0)",
        backgroundColor: "rgba(0, 205, 0, 0.5)",
      },
    ],
  };

  return (
    <div className="dashboardStatsGraphContainer">
      <div className="dashboardStatsGraph">
        <Bar
          options={countTodaysTicketsBySeatOptions}
          data={countTodaysTicketsBySeatDatas}
        />
      </div>
      <div className="dashboardStatsGraph">
        <Line
          options={countCurrentWeekTicketsOptions}
          data={countCurrentWeekTicketsDatas}
        />
      </div>
      <div className="dashboardStatsGraph">
        <Line
          options={lastThirtyDaysTicketsOptions}
          data={lastThirtyDaysTicketsDatas}
        />
      </div>
    </div>
  );
};

export default DashboardStatsGraph;
