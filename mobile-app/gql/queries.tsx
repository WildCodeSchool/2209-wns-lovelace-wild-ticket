import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    getRestaurants {
      id
      name
    }
  }
`;


export const CREATE_TICKET = gql`
  mutation CreateTicket($name: String!, $seats: Float!, $restaurant: String!) {
    createTicket(name: $name, seats: $seats, restaurant: $restaurant) {
      name
    }
  }
`;
