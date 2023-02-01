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
        },
      },
      NotFound: "*",
    },
  },
};

export default linking;