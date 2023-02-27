// TODO: Quand toutes les pages seront créées, modifier l'import sur toutes les autres pages dashboard comme suit.
import { gql, useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardTicketListTab from "../../../components/Dashboard/DashboardTicketListTab/DashboardTicketListTab";
import { UserContext } from "../../../context/UserContext";
import { TicketsHeadTabContent } from "../../../data/DashboardHeadTabDatas";
import {
  TablesByRestaurantQuery,
  TablesByRestaurantQueryVariables,
  TicketsByRestaurantQuery,
  TicketsByRestaurantQueryVariables,
  UpdateClosedAtMutation,
  UpdateClosedAtMutationVariables,
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
        id
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

const CLOSE_TICKET = gql`
mutation UpdateClosedAt($updateClosedAtId: String!) {
  updateClosedAt(id: $updateClosedAtId) {
    id
    closedAt
  }
}
`;

const DashboardTicket = () => {
  const [tickets, setTickets] = useState<GET_TICKETS_BY_RESTAURANT_TYPES>(null);
  const [tables, setTables ] = useState<GET_TABLES_BY_RESTAURANT_TYPES>(null);
  const [emptyTables, setEmptyTables] = useState<GET_TABLES_BY_RESTAURANT_TYPES>(null);
  const [closedTicketId, setClosedTicketId] = useState<string>("");
  const restaurantId = useContext(UserContext)?.userData.restaurant.id;
  console.log(restaurantId);

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

  const [updateClosedAtTicket] = useMutation<UpdateClosedAtMutation, UpdateClosedAtMutationVariables>(CLOSE_TICKET, {
    notifyOnNetworkStatusChange: true,
    variables: {
      updateClosedAtId: closedTicketId,
    }
  })

  const getEmptyTables = (tickets: GET_TICKETS_BY_RESTAURANT_TYPES, tables: GET_TABLES_BY_RESTAURANT_TYPES): GET_TABLES_BY_RESTAURANT_TYPES => {
    const ticketss: any = [];
    const emptyTables: any = [];
    tickets?.filter((ticket) => new Date(ticket.closedAt) > new Date()).map((ticket) => ticketss.push(ticket.table?.number));
    tables?.filter((table) => !ticketss?.includes(table.number)).map((table) => emptyTables.push(table));
    console.log({emptyTables: emptyTables});
    return emptyTables;
  }

  const setTicketToDelete = async (ticketId: string | undefined) => {
    setClosedTicketId(ticketId as string);
  }

  const onDelete = async (ticketId: string | undefined) => {
    try {
      await setTicketToDelete(ticketId);
      console.log({closedTicketId});
      await updateClosedAtTicket();
      ticketsRefetch();
      tablesRefetch();
      toast.success('Le ticket a bien été clôturé.');
    } catch (e) {
      toast.error('Un problème est survenu. Renouvelez la clôture du ticket.');
    }
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
        <DashboardTicketListTab dataHead={TicketsHeadTabContent} tickets={tickets} tables={emptyTables} isLoading={loading} handleDelete={onDelete}/>
      </main>
      <footer className="DashboardMainFooter">
        <h1>PAGINATION</h1>
        <p className="DashboardText">Under Construction...</p>
      </footer>
    </section>
  );
};

export default DashboardTicket;
