import { useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
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

  // GET WAITING TICKETS FUNCTIONNALITY
  const [waitingTickets, setWaitingTickets] =
    useState<GET_TICKETS_BY_RESTAURANT_TYPES>([]);
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

  // GET PLACED TICKETS FUNCTIONNALITY
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

  // GET EMPTY TABLES FUNCTIONNALITY
  const [emptyTables, setEmptyTables] =
    useState<GET_TABLES_BY_RESTAURANT_TYPES>(null);

  const getEmptyTables = (
    tickets: GET_TICKETS_BY_RESTAURANT_TYPES,
    tables: GET_TABLES_BY_RESTAURANT_TYPES
  ): GET_TABLES_BY_RESTAURANT_TYPES => {
    const placedTickets = tickets
      ?.filter((ticket) => new Date(ticket.closedAt) > new Date())
      .map((ticket) => ticket.table?.number);

    const emptyTables = tables?.filter(
      (table) => !placedTickets?.includes(table.number)
    );

    return emptyTables || [];
  };

  // GET TABLES BY SEATS
  const [activeFilterButton, setActiveFilterButton] = useState<number | null>(
    null
  );

  const handleFilterButtonClick = async (ticketSeats: number | null) => {
    setActiveFilterButton(ticketSeats);
    setSortSeats(ticketSeats);
    setSeats(ticketSeats);
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

  useEffect(() => {
    setEmptyTables(getEmptyTables(tickets, tables));
    const intervalId = setInterval(() => {
      refetchWaitingTickets();
      refetchPlacedTickets();
      tablesRefetch();
      setEmptyTables(getEmptyTables(tickets, tables));
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
  );
};

export default DashboardTicket;
