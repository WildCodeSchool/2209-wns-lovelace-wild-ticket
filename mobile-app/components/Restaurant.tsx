import { StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  GET_TABLES_BY_RESTAURANT_TYPES,
  GET_TICKETS_BY_RESTAURANT_TYPES,
  RESTAURANT_TYPE,
} from "../types/DataTypes";
import { useQuery } from "@apollo/client";
import {
  TablesByRestaurantQuery,
  TablesByRestaurantQueryVariables,
  TicketsByRestaurantQuery,
  TicketsByRestaurantQueryVariables,
} from "../gql/graphql";
import {
  GET_TABLES_BY_RESTAURANT,
  GET_TICKETS_BY_RESTAURANT,
} from "../query/queries";
import { TicketContext } from "../context/TicketContext";
import getTableCapacityFromSelectedSeats from "../services/ConvertCapacity";

const Restaurant = ({
  id,
  name,
  openAt,
  closeAt,
  picture,
}: RESTAURANT_TYPE) => {
  const ticketContext = useContext(TicketContext);
  const isRestaurantClosed = (openAt: any, closeAt: any) => {
    return new Date(openAt) > new Date() || new Date(closeAt) < new Date()
      ? true
      : false;
  };
  const [tables, setTables] = useState<GET_TABLES_BY_RESTAURANT_TYPES>(null);

  const { loading: tablesLoading, refetch: tablesRefetch } = useQuery<
    TablesByRestaurantQuery,
    TablesByRestaurantQueryVariables
  >(GET_TABLES_BY_RESTAURANT, {
    skip: id === undefined,
    notifyOnNetworkStatusChange: true,
    variables: {
      restaurantId: id as string,
      capacity: getTableCapacityFromSelectedSeats(
        ticketContext?.selectedId as number
      ),
    },
    onCompleted: (data) => {
      if (data.TablesByRestaurant) {
        setTables(data.TablesByRestaurant);
      }
    },
  });

  const [tickets, setTickets] =
    useState<GET_TICKETS_BY_RESTAURANT_TYPES | null>(null);

  const { loading: ticketsLoading, refetch: ticketsRefetch } = useQuery<
    TicketsByRestaurantQuery,
    TicketsByRestaurantQueryVariables
  >(GET_TICKETS_BY_RESTAURANT, {
    skip: id === undefined,
    notifyOnNetworkStatusChange: true,
    variables: {
      restaurantId: id as string,
      seats: getTableCapacityFromSelectedSeats(
        ticketContext?.selectedId as number
      ),
    },
    onCompleted: (data) => {
      if (data.TicketsByRestaurant) {
        setTickets(data.TicketsByRestaurant);
      }
    },
  });

  const [emptyTables, setEmptyTables] = useState<number | null>(null);

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
      ?.filter((table) => !placedTickets?.includes(table.number))
      .map((table) => emptyTables.push(table));

    return emptyTables.length;
  };

  const [waitingTickets, setwaitingTickets] = useState<number | null>(null);

  const getWaitingTickets = (
    tickets: GET_TICKETS_BY_RESTAURANT_TYPES,
    tables: GET_TABLES_BY_RESTAURANT_TYPES
  ): number => {
    const placedTickets: (number | undefined)[] = [];
    const emptyTables: GET_TABLES_BY_RESTAURANT_TYPES = [];

    tickets
      ?.filter((ticket) => ticket.closedAt == null)
      .map((ticket) => placedTickets.push(ticket.table?.number));

    tables
      ?.filter((table) => !placedTickets?.includes(table.number))
      .map((table) => emptyTables.push(table));

    return placedTickets.length;
  };

  useEffect(() => {
    tablesRefetch();
    ticketsRefetch();
    setEmptyTables(getEmptyTables(tickets, tables));
    setwaitingTickets(getWaitingTickets(tickets, tables));
  }, [tickets, tables]);

  return picture ? (
    <>
      <Image
        style={styles.picture}
        source={{ uri: picture }}
        blurRadius={isRestaurantClosed(openAt, closeAt) ? 10 : 0}
      />
      <Text style={styles.text}>
        {tablesLoading || ticketsLoading ? (
          <ActivityIndicator size="small" color="#155e75" />
        ) : isRestaurantClosed(openAt, closeAt) ? null : emptyTables ? (
          <>
            Table
            {emptyTables && emptyTables > 1 ? "s" : null} disponible
            {emptyTables && emptyTables > 1 ? "s" : null} :
            <Text style={styles.greenText}> {emptyTables}</Text>
          </>
        ) : (
          <>
            Ticket
            {waitingTickets && waitingTickets > 1 ? "s" : null} en attente :
            <Text style={styles.redText}> {waitingTickets}</Text>
          </>
        )}
      </Text>
    </>
  ) : (
    <>
      <Text style={styles.restaurantCard}>{name}</Text>
      <Text style={styles.text}>
        {emptyTables ? (
          <>
            <Text style={styles.greenText}>{emptyTables}</Text> table
            {emptyTables && emptyTables > 1 ? "s" : null} disponible
            {emptyTables && emptyTables > 1 ? "s" : null}
          </>
        ) : (
          "Attente prévue pour ce restaurant"
        )}
      </Text>
    </>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  picture: {
    width: 175,
    height: 175,
  },
  text: {
    position: "absolute",
    bottom: 3,
    fontSize: 18,
    fontWeight: "bold",
  },
  greenText: {
    color: "#02C900",
  },
  redText: {
    color: "red",
  },
  restaurantCard: {
    fontSize: 24,
  },
});
