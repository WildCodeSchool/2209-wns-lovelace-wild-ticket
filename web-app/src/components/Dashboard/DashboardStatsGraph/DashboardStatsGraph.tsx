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
import { Bar } from "react-chartjs-2";
import { GET_TICKETS_BY_RESTAURANT_TYPES } from "../../../types/DataTypes";
import {
  countTodaysTicketsBySeat,
  lastThirtyDays,
} from "../../../services/StatsService";

ChartJS.register(
  CategoryScale,
  LinearScale,
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

  let labels = ["T2", "T4", "T6", "T8"];

  const countTodaysTicketsBySeatDatas = {
    labels,
    datasets: [
      {
        label: "Total des tickets",
        data: arrayOfCountTodaysTicketsBySeat,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Statistiques pour le total des tickets par jour des 30 derniers jours.
  const arrayOfLastThirtyDays = lastThirtyDays();
  console.log(arrayOfLastThirtyDays);

  return (
    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "50px"}}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          width: "45%",
        }}
      >
        <Bar
          options={countTodaysTicketsBySeatOptions}
          data={countTodaysTicketsBySeatDatas}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          width: "45%",
        }}
      >
        <Bar
          options={countTodaysTicketsBySeatOptions}
          data={countTodaysTicketsBySeatDatas}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          width: "45%",
        }}
      >
        <Bar
          options={countTodaysTicketsBySeatOptions}
          data={countTodaysTicketsBySeatDatas}
        />
      </div>
    </div>
  );
};

export default DashboardStatsGraph;
