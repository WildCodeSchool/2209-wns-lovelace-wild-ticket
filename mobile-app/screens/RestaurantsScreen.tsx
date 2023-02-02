import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { GetRestaurantsQuery } from "../gql/graphql";
import {useQuery } from "@apollo/client";
import Restaurant from "../components/Restaurant";
import { RootStackScreenProps } from "../types";
import { GET_RESTAURANT_BY_ID, GET_RESTAURANTS } from "../gql/queries";

const RestaurantsScreen = ({
  navigation,
}: RootStackScreenProps<"Restaurants">) => {
  const { data } = useQuery<GetRestaurantsQuery>(GET_RESTAURANTS);

  const [restoId, setRestoId] = useState< any | null>("");
  console.log(restoId)  
  // const [queryById, { loading, error }] = useLazyQuery<GetRestaurantByIdQuery, GetRestaurantByIdQueryVariables>(GET_RESTAURANT_BY_ID);
  // const GetResto = async (getRestaurantByIdId: string) => {
  //   try { await queryById({
  //     variables: { getRestaurantByIdId },
  //   }); } catch (error) {

  //   }
  // }

  return (
    <View>
      <View style={styles.containerHeaderBoutton}>
        <Button title="Retour" onPress={() => navigation.navigate("Select")} />
        <Button
          title="Continuer"
          onPress={() => navigation.navigate("Ticket", {restoId})}
        />
      </View>
      <Text>RestaurantsScreen</Text>
      <ScrollView style={styles.restaurantList}>
        {data?.getRestaurants.map((restaurant) => (
          <View key={restaurant.id}>
            <TouchableOpacity onPress={() => setRestoId(restaurant.id)}>
              <Restaurant {...restaurant} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RestaurantsScreen;

const styles = StyleSheet.create({
  container: { marginTop: 50, marginLeft: 50, marginRight: 50 },
  containerHeaderBoutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "bold",
    color: 'black'
  },
  restaurantList: {
    padding: 12,
    width: "100%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
