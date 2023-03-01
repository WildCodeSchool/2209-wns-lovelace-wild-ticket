import { gql } from "@apollo/client";

export const GET_TICKETS_BY_RESTAURANT = gql`
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

export const GET_TABLES_BY_RESTAURANT = gql`
  query TablesByRestaurant($tablesByRestaurantId: String!) {
    TablesByRestaurant(id: $tablesByRestaurantId) {
      id
      number
      capacity
    }
  }
`;

export const UPDATE_DELIVERED_AT = gql`
  mutation UpdateDeliveredAt($updateDeliveredAtId: ID!, $table: String!) {
    updateDeliveredAt(id: $updateDeliveredAtId, table: $table) {
      id
    }
  }
`;

export const UPDATE_PLACED_AT = gql`
  mutation UpdatePlacedAt($updatePlacedAtId: String!) {
    updatePlacedAt(id: $updatePlacedAtId) {
      id
      deliveredAt
      placedAt
      closedAt
    }
  }
`;

export const UPDATE_CLOSED_AT = gql`
  mutation UpdateClosedAt($updateClosedAtId: String!) {
    updateClosedAt(id: $updateClosedAtId) {
      id
      closedAt
    }
  }
`;
