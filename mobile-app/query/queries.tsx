import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query Restaurants {
    getRestaurants {
      id
      name
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
