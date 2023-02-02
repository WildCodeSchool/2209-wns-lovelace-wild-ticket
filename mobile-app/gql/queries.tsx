import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    getRestaurants {
      id
      name
    }
  }
`;

export const GET_RESTAURANT_BY_ID = gql`
  query GetRestaurantById($getRestaurantByIdId: String!) {
    getRestaurantById(id: $getRestaurantByIdId) {
      id
      name
    }
  }
`;