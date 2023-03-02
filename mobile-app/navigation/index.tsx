import * as React from "react";
import { ColorSchemeName } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import SelectScreen from "../screens/SelectScreen";
import RestaurantsScreen from "../screens/RestaurantsScreen";
import CreateTicketScreen from "../screens/CreateTicketScreen";
import { ContextProvider } from "../context/TicketContext";

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  return (
    <ContextProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Select"
          component={SelectScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Restaurants"
          component={RestaurantsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Ticket" component={CreateTicketScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Navigator>
    </ContextProvider>
  );
}
