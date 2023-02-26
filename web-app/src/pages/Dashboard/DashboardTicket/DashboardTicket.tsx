// TODO: Quand toutes les pages seront créées, modifier l'import sur toutes les autres pages dashboard comme suit.
import { gql, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import DashboardTicketListTab from "../../../components/Dashboard/DashboardTicketListTab/DashboardTicketListTab";
import { UserContext } from "../../../context/UserContext";
import { TicketsHeadTabContent } from "../../../data/DashboardHeadTabDatas";
import {
  TablesByRestaurantQuery,
  TablesByRestaurantQueryVariables,
  TicketsByRestaurantQuery,
  TicketsByRestaurantQueryVariables,
} from "../../../gql/graphql";
import { GET_TABLES_BY_RESTAURANT_TYPES, GET_TICKETS_BY_RESTAURANT_TYPES } from "../../../types/DataTypes";
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

const GET_TABLES_BY_RESTAURANT = gql`
  query TablesByRestaurant($tablesByRestaurantId: String!) {
    TablesByRestaurant(id: $tablesByRestaurantId) {
      id
      number
      capacity
    }
  }
`;

const DashboardTicket = () => {
  const [tickets, setTickets] = useState<GET_TICKETS_BY_RESTAURANT_TYPES>(null);
  const [tables, setTables ] = useState<GET_TABLES_BY_RESTAURANT_TYPES>(null);
  const [emptyTables, setEmptyTables] = useState<GET_TABLES_BY_RESTAURANT_TYPES>(null);
  const restaurantId = useContext(UserContext)?.userData.restaurant.id;

  const { loading, refetch: ticketsRefetch } = useQuery<TicketsByRestaurantQuery, TicketsByRestaurantQueryVariables>(GET_TICKETS_BY_RESTAURANT, {
    notifyOnNetworkStatusChange: true,
    variables: { ticketsByRestaurantId: restaurantId },
    onCompleted: (data) => {
      if (data.TicketsByRestaurant) {
        setTickets(data.TicketsByRestaurant);
      }
    },
  });

  const { refetch: tablesRefetch } = useQuery<TablesByRestaurantQuery, TablesByRestaurantQueryVariables>(GET_TABLES_BY_RESTAURANT, {
    notifyOnNetworkStatusChange: true,
    variables: { tablesByRestaurantId: restaurantId },
    onCompleted: (data) => {
      if (data.TablesByRestaurant) {
        setTables(data.TablesByRestaurant);
      }
    },
  });

  const getEmptyTables = (tickets: GET_TICKETS_BY_RESTAURANT_TYPES, tables: GET_TABLES_BY_RESTAURANT_TYPES): GET_TABLES_BY_RESTAURANT_TYPES => {
    const ticketss: any = [];
    const emptyTables: any = [];
    tickets?.filter((ticket) => new Date(ticket.closedAt) > new Date()).map((ticket) => ticketss.push(ticket.table?.number));
    tables?.filter((table) => !ticketss?.includes(table.number)).map((table) => emptyTables.push(table));
    console.log({emptyTables: emptyTables});
    return emptyTables;
  }

  useEffect(() => {
    setEmptyTables(getEmptyTables(tickets, tables));
    const intervalId = setInterval(() => {
      ticketsRefetch();
      tablesRefetch();
      setEmptyTables(getEmptyTables(tickets, tables));
    }, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [tickets, tables, ticketsRefetch, tablesRefetch]);

  return (
    <section className="DashboardMainSection">
      {/* TODO: Le header sera utilisé pour les filtres, bouton d'ajout etc. (cf. maquette) */}
      <header className="DashboardMainHeader">
        <h1>FILTRES ET BOUTONS</h1>
        <p className="DashboardText">Under Construction...</p>
      </header>
      <main className="DashboardMainList">
        <DashboardTicketListTab dataHead={TicketsHeadTabContent} tickets={tickets} tables={emptyTables} isLoading={loading} />
      </main>
      <footer className="DashboardMainFooter">
        <h1>PAGINATION</h1>
        <p className="DashboardText">Under Construction...</p>
      </footer>
    </section>
  );
};

export default DashboardTicket;
