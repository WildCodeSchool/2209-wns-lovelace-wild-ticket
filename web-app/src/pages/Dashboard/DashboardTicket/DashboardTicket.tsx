import { useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { Helmet } from "react-helmet-async";
import DashboardTicketListTab from "../../../components/Dashboard/DashboardTicketListTab/DashboardTicketListTab";
import { AppContext } from "../../../context/AppContext";
import { TicketsFilterTabContent } from "../../../data/DashboardTicketDatas";
import {
  PlacedTicketsByRestaurantQuery,
  PlacedTicketsByRestaurantQueryVariables,
  UpdateClosedAtMutation,
  UpdateClosedAtMutationVariables,
  UpdateDeliveredAtMutation,
  UpdateDeliveredAtMutationVariables,
  UpdatePlacedAtMutation,
  UpdatePlacedAtMutationVariables,
  WaitingTicketsByRestaurantQuery,
  WaitingTicketsByRestaurantQueryVariables,
} from "../../../gql/graphql";
import {
  GET_PLACED_TICKETS_BY_RESTAURANT,
  GET_WAITING_TICKETS_BY_RESTAURANT,
  UPDATE_CLOSED_AT,
  UPDATE_DELIVERED_AT,
  UPDATE_PLACED_AT,
} from "../../../queries/Queries";
import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKETS_BY_RESTAURANT_TYPES,
} from "../../../types/DataTypes";
import "./DashboardTicket.scss";
import TableService from "../../../services/TableService";

const DashboardTicket = () => {
  const restaurantId = useContext(AppContext)?.userData.restaurant.id;
  const setSeats = useContext(AppContext)?.setSeats as React.Dispatch<
    React.SetStateAction<number | null>
  >;
  let tickets = useContext(AppContext)
    ?.tickets as GET_TICKETS_BY_RESTAURANT_TYPES;
  const tables = useContext(AppContext)
    ?.tables as GET_TABLES_BY_RESTAURANT_TYPES;
  const ticketsLoading = useContext(AppContext)?.ticketsLoading as boolean;
  const tablesRefetch = useContext(AppContext)?.ticketsRefetch as () => {};
  const [sortSeats, setSortSeats] = useState<number | null>(null);
  const [emptyTables, setEmptyTables] =
    useState<GET_TABLES_BY_RESTAURANT_TYPES>(null);
  const [activeFilterButton, setActiveFilterButton] = useState<number | null>(
    null
  );
  const [waitingTickets, setWaitingTickets] =
    useState<GET_TICKETS_BY_RESTAURANT_TYPES>([]);

  // GET WAITING TICKETS
  const { refetch: refetchWaitingTickets } = useQuery<
    WaitingTicketsByRestaurantQuery,
    WaitingTicketsByRestaurantQueryVariables
  >(GET_WAITING_TICKETS_BY_RESTAURANT, {
    skip: restaurantId === undefined,
    notifyOnNetworkStatusChange: true,
    variables: { restaurantId: restaurantId as string, seats: sortSeats },
    onCompleted: (data) => {
      if (data?.WaitingTicketsByRestaurant) {
        setWaitingTickets(data.WaitingTicketsByRestaurant);
      }
    },
  });

  // GET PLACED TICKETS
  const [placedTickets, setPlacedTickets] =
    useState<GET_TICKETS_BY_RESTAURANT_TYPES>([]);
  const { refetch: refetchPlacedTickets } = useQuery<
    PlacedTicketsByRestaurantQuery,
    PlacedTicketsByRestaurantQueryVariables
  >(GET_PLACED_TICKETS_BY_RESTAURANT, {
    skip: restaurantId === undefined,
    notifyOnNetworkStatusChange: true,
    variables: { restaurantId: restaurantId as string, seats: sortSeats },
    onCompleted: (data) => {
      if (data?.PlacedTicketsByRestaurant) {
        setPlacedTickets(data.PlacedTicketsByRestaurant);
      }
    },
  });

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
      refetchWaitingTickets();
      refetchPlacedTickets();
      tablesRefetch();
      toast.success(
        "La table a bien été délivrée. Une notification a été envoyée au client."
      );
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

  const onDeliver = async (
    waitingTickets: GET_TICKETS_BY_RESTAURANT_TYPES,
    ticketId: string,
    tableId: string
  ) => {
    const notEmtyTables: number[] = [];

    waitingTickets?.forEach((ticket) => {
      if (ticket.table) {
        const tableNumber: number = ticket.table.number;
        notEmtyTables.push(tableNumber);
      }
    });

    const tableNumber = tables?.find((table) => table.id === tableId)?.number;

    if (tableNumber && notEmtyTables.includes(tableNumber)) {
      toast.warning(
        "Merci de clôturer le ticket du client qui ne s'est pas présenté avant de réserver cette table pour ce ticket."
      );
      return;
    }

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
      refetchWaitingTickets();
      refetchPlacedTickets();
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
      refetchWaitingTickets();
      refetchPlacedTickets();
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

  // BUTTON GROUP FILTERS
  const handleFilterButtonClick = async (ticketSeats: number | null) => {
    setActiveFilterButton(ticketSeats);
    setSortSeats(ticketSeats);
    setSeats(ticketSeats);
  };

  useEffect(() => {
    setEmptyTables(TableService.getEmptyTables(tickets, tables));
    const intervalId = setInterval(() => {
      refetchWaitingTickets();
      refetchPlacedTickets();
      tablesRefetch();
      setEmptyTables(TableService.getEmptyTables(tickets, tables));
    }, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    tickets,
    tables,
    refetchWaitingTickets,
    refetchPlacedTickets,
    tablesRefetch,
  ]);

  return (
    <>
      <Helmet>
        <title>R'Ticket - File d'attente</title>
      </Helmet>
      <section className="DashboardTicketSection">
        <header className="DashboardTicketHeader">
          <div className="DashboardTicketHeaderButtonContainer">
            <span className="DashboardTicketHeaderButtonSet">
              {TicketsFilterTabContent.map((ticketContent, index) => (
                <Button
                  className={
                    activeFilterButton === ticketContent.seats
                      ? "DashboardTicketHeaderButton DashboardTicketHeaderButtonActive"
                      : "DashboardTicketHeaderButton"
                  }
                  key={index}
                  label={ticketContent.label}
                  onClick={() => {
                    handleFilterButtonClick(ticketContent.seats);
                  }}
                />
              ))}
            </span>
          </div>
        </header>
        <main className="DashboardTicketList">
          <DashboardTicketListTab
            waitingTickets={waitingTickets}
            placedTickets={placedTickets}
            tables={emptyTables}
            isLoading={ticketsLoading}
            handleDelete={onDelete}
            handleDeliver={onDeliver}
            handlePlace={onPlace}
          />
        </main>
      </section>
    </>
  );
};

export default DashboardTicket;
