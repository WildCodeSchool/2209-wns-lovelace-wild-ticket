// TODO: Quand toutes les pages seront créées, modifier l'import sur toutes les autres pages dashboard comme suit.
import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardTicketListTab from "../../../components/Dashboard/DashboardTicketListTab/DashboardTicketListTab";
import { AppContext } from "../../../context/AppContext";
import { TicketsHeadTabContent } from "../../../data/DashboardHeadTabDatas";
import {
  UpdateClosedAtMutation,
  UpdateClosedAtMutationVariables,
  UpdateDeliveredAtMutation,
  UpdateDeliveredAtMutationVariables,
  UpdatePlacedAtMutation,
  UpdatePlacedAtMutationVariables,
} from "../../../gql/graphql";
import {
  UPDATE_CLOSED_AT,
  UPDATE_DELIVERED_AT,
  UPDATE_PLACED_AT,
} from "../../../queries/Queries";
import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKETS_BY_RESTAURANT_TYPES,
} from "../../../types/DataTypes";
import "../DashboardMain.scss";

const DashboardTicket = () => {
  const tickets = useContext(AppContext)
    ?.tickets as GET_TICKETS_BY_RESTAURANT_TYPES;
  const tables = useContext(AppContext)
    ?.tables as GET_TABLES_BY_RESTAURANT_TYPES;
  const ticketsLoading = useContext(AppContext)?.ticketsLoading as boolean;
  const ticketsRefetch = useContext(AppContext)?.ticketsRefetch as () => {};
  const tablesRefetch = useContext(AppContext)?.ticketsRefetch as () => {};

  // GET EMPTY TABLES FUNCTIONNALITY
  const [emptyTables, setEmptyTables] =
    useState<GET_TABLES_BY_RESTAURANT_TYPES>(null);

  const getEmptyTables = (
    tickets: GET_TICKETS_BY_RESTAURANT_TYPES,
    tables: GET_TABLES_BY_RESTAURANT_TYPES
  ): GET_TABLES_BY_RESTAURANT_TYPES => {
    const placedTickets: (number | undefined)[] = [];
    const emptyTables: GET_TABLES_BY_RESTAURANT_TYPES = [];

    tickets
      ?.filter((ticket) => new Date(ticket.closedAt) > new Date())
      .map((ticket) => placedTickets.push(ticket.table?.number));

    tables
      ?.filter((table) => !placedTickets?.includes(table.number))
      .map((table) => emptyTables.push(table));

    return emptyTables;
  };

  // UPDATE DELIVERED AT FUNCTIONNALITY
  const [freeTableToDeliver, setFreeTableToDeliver] = useState<string>("");
  const [freeTicketToDeliver, setFreeTicketToDeliver] = useState<string>("");

  const [updateDeliveredAtTicket] = useMutation<
    UpdateDeliveredAtMutation,
    UpdateDeliveredAtMutationVariables
  >(UPDATE_DELIVERED_AT, {
    notifyOnNetworkStatusChange: true,
    variables: {
      updateDeliveredAtId: freeTicketToDeliver,
      table: freeTableToDeliver,
    },
    onCompleted: () => {
      ticketsRefetch();
      tablesRefetch();
      toast.success("La table a bien été délivrée");
    },
    onError: () => {
      toast.error("Un problème est survenu. Renouvelez l'opération.");
    },
  });

  const setTicketAndTableToDeliver = async (
    ticketId: string,
    tableId: string
  ) => {
    setFreeTicketToDeliver(ticketId as string);
    setFreeTableToDeliver(tableId as string);
  };

  const onDeliver = async (ticketId: string, tableId: string) => {
    await setTicketAndTableToDeliver(ticketId as string, tableId as string);
    await updateDeliveredAtTicket();
  };

  // UPDATE PLACED AT FUNCTIONNALITY
  const [placedTicketId, setPlacedTicketId] = useState<string>("");

  const [updatePlacedAtTicket] = useMutation<
    UpdatePlacedAtMutation,
    UpdatePlacedAtMutationVariables
  >(UPDATE_PLACED_AT, {
    notifyOnNetworkStatusChange: true,
    variables: {
      updatePlacedAtId: placedTicketId,
    },
    onCompleted: () => {
      ticketsRefetch();
      tablesRefetch();
      toast.success("Le client a bien été placé.");
    },
    onError: () => {
      toast.error("Un problème est survenu. Renouvelez l'opération.");
    },
  });

  const setTicketToPlace = async (ticketId: string) => {
    setPlacedTicketId(ticketId as string);
  };

  const onPlace = async (ticketId: string) => {
    await setTicketToPlace(ticketId as string);
    await updatePlacedAtTicket();
  };

  // UPDATE CLOSED AT FUNCTIONNALITY
  const [closedTicketId, setClosedTicketId] = useState<string>("");

  const [updateClosedAtTicket] = useMutation<
    UpdateClosedAtMutation,
    UpdateClosedAtMutationVariables
  >(UPDATE_CLOSED_AT, {
    notifyOnNetworkStatusChange: true,
    variables: {
      updateClosedAtId: closedTicketId,
    },
    onCompleted: () => {
      ticketsRefetch();
      tablesRefetch();
      toast.success("Le ticket a bien été clôturé.");
    },
    onError: () => {
      toast.error("Un problème est survenu. Renouvelez l'opération.");
    },
  });

  const setTicketToDelete = async (ticketId: string) => {
    setClosedTicketId(ticketId as string);
  };

  const onDelete = async (ticketId: string) => {
    await setTicketToDelete(ticketId as string);
    await updateClosedAtTicket();
  };

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
        <DashboardTicketListTab
          dataHead={TicketsHeadTabContent}
          tickets={tickets}
          tables={emptyTables}
          isLoading={ticketsLoading}
          handleDelete={onDelete}
          handleDeliver={onDeliver}
          handlePlace={onPlace}
        />
      </main>
      <footer className="DashboardMainFooter"></footer>
    </section>
  );
};

export default DashboardTicket;
