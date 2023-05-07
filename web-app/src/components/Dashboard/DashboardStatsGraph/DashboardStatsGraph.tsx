import React, { useContext } from "react";
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
import "./DashboardStatsGraph.scss";
import { useQuery } from "@apollo/client";
import { GET_STATS_BY_RESTAURANT } from "../../../queries/Queries";
import { AppContext } from "../../../context/AppContext";
import {
  StatsByRestaurantQuery,
  StatsByRestaurantQueryVariables,
} from "../../../gql/graphql";
import { InfinitySpin } from "react-loader-spinner";

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

const DashboardStatsGraph = () => {
  const restaurantId = useContext(AppContext)?.userData.restaurant.id;

  const { data, loading } = useQuery<
    StatsByRestaurantQuery,
    StatsByRestaurantQueryVariables
  >(GET_STATS_BY_RESTAURANT, {
    notifyOnNetworkStatusChange: true,
    variables: { restaurantId: restaurantId as string },
  });
  const stats = data?.StatsByRestaurant;
  let labels = [];

  // Statistiques pour le nombre de tickets du jour par capacité de table.
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

  labels = stats?.tableCapacity as string[];

  const countTodaysTicketsBySeatDatas = {
    labels,
    datasets: [
      {
        label: "Total des tickets",
        data: stats?.countTicketsBySeat,
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
    ],
  };

  // Statistiques pour le total des tickets par jour de la semaine en cours.
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

  labels = stats?.daysOfWeek as string[];

  const countCurrentWeekTicketsDatas = {
    labels,
    datasets: [
      {
        label: "Total des tickets",
        data: stats?.countActualWeekTickets,
        borderColor: "rgb(39, 97, 245)",
        backgroundColor: "rgba(39, 97, 245, 0.5)",
      },
    ],
  };

  // Statistiques pour le total des tickets pour les 30 derniers jours.
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

  labels = stats?.lastThirtyDays as string[];

  const lastThirtyDaysTicketsDatas = {
    labels,
    datasets: [
      {
        label: "Total des tickets",
        data: stats?.countLastThirtyDaysTickets,
        borderColor: "rgb(0, 205, 0)",
        backgroundColor: "rgba(0, 205, 0, 0.5)",
      },
    ],
  };

  return (
    <div className="dashboardStatsGraphContainer">
      <div className="dashboardStatsGraph">
        {loading && (
          <div className="dashboardStatsGraphLoadingSpinContainer">
            <div className="dashboardStatsGraphLoadingSpin">
              <InfinitySpin width="200" color="#155e75" />
            </div>
          </div>
        )}
        <Bar
          options={countTodaysTicketsBySeatOptions}
          data={countTodaysTicketsBySeatDatas}
        />
      </div>
      <div className="dashboardStatsGraph">
        {loading && (
          <div className="dashboardStatsGraphLoadingSpinContainer">
            <div className="dashboardStatsGraphLoadingSpin">
              <InfinitySpin width="200" color="#155e75" />
            </div>
          </div>
        )}
        <Line
          options={countCurrentWeekTicketsOptions}
          data={countCurrentWeekTicketsDatas}
        />
      </div>
      <div className="dashboardStatsGraph">
        {loading && (
          <div className="dashboardStatsGraphLoadingSpinContainer">
            <div className="dashboardStatsGraphLoadingSpin">
              <InfinitySpin width="200" color="#155e75" />
            </div>
          </div>
        )}
        <Line
          options={lastThirtyDaysTicketsOptions}
          data={lastThirtyDaysTicketsDatas}
        />
      </div>
    </div>
  );
};

export default DashboardStatsGraph;
