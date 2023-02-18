// TODO: Quand toutes les pages seront créées, modifier l'import sur toutes les autres pages dashboard comme suit.
import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import DashboardTicketListTab from "../../../components/Dashboard/DashboardTicketListTab/DashboardTicketListTab";
import { UserContext } from "../../../context/UserContext";
import {
  TicketsByRestaurantQuery,
  TicketsByRestaurantQueryVariables,
} from "../../../gql/graphql";
import { GET_TICKETS_BY_RESTAURANT_TYPES } from "../../../types/DataTypes";
import "../DashboardMain.scss";

const GET_TICKETS_BY_RESTAURANT = gql`
  query TicketsByRestaurant($ticketsByRestaurantId: String!) {
    TicketsByRestaurant(id: $ticketsByRestaurantId) {
      id
      number
      name
      seats
      email
      phoneNumber
      createdAt
      deliveredAt
      placedAt
      closedAt
      table {
        number
      }
    }
  }
`;

const DashboardTicket = () => {
  const [tickets, setTickets] = useState<GET_TICKETS_BY_RESTAURANT_TYPES>(null);
  const restaurantId = useContext(UserContext)?.userData.restaurant.id;

  const { loading, refetch } = useQuery<TicketsByRestaurantQuery, TicketsByRestaurantQueryVariables>(GET_TICKETS_BY_RESTAURANT, {
    notifyOnNetworkStatusChange: true,
    variables: { ticketsByRestaurantId: restaurantId },
    onCompleted: (data) => {
      if (data.TicketsByRestaurant) {
        setTickets(data.TicketsByRestaurant);
      }
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 10 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <section className="DashboardMainSection">
      {/* TODO: Le header sera utilisé pour les filtres, bouton d'ajout etc. (cf. maquette) */}
      <header className="DashboardMainHeader">
        <h1>FILTRES ET BOUTONS</h1>
        <p className="DashboardText">Under Construction...</p>
      </header>
      <main className="DashboardMainList">
        <DashboardTicketListTab dataTickets={tickets} isLoading={loading} />
      </main>
      <footer className="DashboardMainFooter">
        <h1>PAGINATION</h1>
        <p className="DashboardText">Under Construction...</p>
      </footer>
    </section>
  );
};

export default DashboardTicket;
