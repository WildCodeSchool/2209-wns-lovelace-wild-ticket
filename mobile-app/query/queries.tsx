import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query Restaurants {
    getRestaurants {
      id
      name
      openAt
      closeAt
      picture
      ticketWaitingLimit
    }
  }
`;

export const GET_PAGINATED_RESTAURANTS_BY_POLE = gql`
  query GetPaginateRestaurantsByPole($pole: String!, $pageNumber: Float!) {
    getPaginateRestaurantsByPole(pole: $pole, pageNumber: $pageNumber) {
      restaurants {
        id
        name
        openAt
        closeAt
        picture
        ticketWaitingLimit
      }
      nextPageNumber
      totalCount
    }
  }
`;

export const CREATE_TICKET = gql`
  mutation CreateTicket(
    $name: String!
    $seats: Float!
    $restaurant: String!
    $email: String
    $phoneNumber: String
  ) {
    createTicket(
      name: $name
      seats: $seats
      restaurant: $restaurant
      email: $email
      phoneNumber: $phoneNumber
    ) {
      id
      number
      seats
      createdAt
    }
  }
`;

export const GET_TICKETS_BY_RESTAURANT = gql`
  query TicketsByRestaurant($restaurantId: ID!, $seats: Float) {
    TicketsByRestaurant(restaurantId: $restaurantId, seats: $seats) {
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
  query TablesByRestaurant($restaurantId: ID!, $capacity: Float) {
    TablesByRestaurant(restaurantId: $restaurantId, capacity: $capacity) {
      id
      number
      capacity
    }
  }
`;
