import { gql } from "@apollo/client";

/**
 * **************** APPUSER QUERIES **********************
 */
export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!, $rememberMe: Boolean!) {
    signIn(email: $email, password: $password, rememberMe: $rememberMe) {
      id
      email
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut($signOutId: String!) {
    signOut(id: $signOutId) {
      id
    }
  }
`;

export const SEND_RESET_PASSWORD_EMAIL = gql`
  mutation SendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email)
  }
`;

export const UPDATE_USER_PASSWORD_WITH_TOKEN = gql`
  mutation updateUserPasswordWithToken($token: String!, $password: String!) {
    updateUserPasswordWithToken(token: $token, password: $password)
  }
`;

export const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      id
      email
      role
      poles {
        id
        name
      }
      restaurant {
        id
        name
      }
    }
  }
`;

/**
 * **************** TICKET QUERIES ***********************
 */
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

/**
 * *************** TABLE QUERIES **********************
 */
export const GET_TABLES_BY_RESTAURANT = gql`
  query TablesByRestaurant($restaurantId: ID!, $capacity: Float) {
    TablesByRestaurant(restaurantId: $restaurantId, capacity: $capacity) {
      id
      number
      capacity
    }
  }
`;

/**
 * *************** RESTAURANT QUERIES **********************
 */

export const UPDATE_RESTAURANTS_TIME = gql`
  mutation UpdateRestaurantOpeningTime(
    $updateRestaurantOpeningTimeId: ID!
    $hourOpenAt: Float!
    $minutesOpenAt: Float!
    $hourCloseAt: Float!
    $minutesCloseAt: Float!
  ) {
    updateRestaurantOpeningTime(
      id: $updateRestaurantOpeningTimeId
      hourOpenAt: $hourOpenAt
      minutesOpenAt: $minutesOpenAt
      hourCloseAt: $hourCloseAt
      minutesCloseAt: $minutesCloseAt
    ) {
      closeAt
      openAt
    }
  }
`;
