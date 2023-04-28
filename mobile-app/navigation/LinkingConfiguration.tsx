import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Home: {
        screens: {
          Select: {
            screens: {
              SelectScreen: "Select",
              Restaurants: {
                screens: {
                  RestaurantsScreen: "Restaurants",
                },
              },
            },
          },
          Ticket: {
            screens: {
              CreateTicketScreen: "Ticket",
            },
          },
          TicketConfirm: {
            screens: {
              TicketConfirmationScreen: "TicketConfirm",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};

export default linking;
