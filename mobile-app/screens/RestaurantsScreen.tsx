import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { GetRestaurantsQuery } from "../gql/graphql";
import { useQuery } from "@apollo/client";
import Restaurant from "../components/Restaurant";
import { RootStackScreenProps } from "../types";
import { GET_RESTAURANTS } from "../gql/queries";

const RestaurantsScreen = ({
  navigation,
}: RootStackScreenProps<"Restaurants">) => {
  const { data } = useQuery<GetRestaurantsQuery>(GET_RESTAURANTS);

  const [resto, setRestoId] = useState<any | null>("");
  console.log(resto);
  // const [queryById, { loading, error }] = useLazyQuery<GetRestaurantByIdQuery, GetRestaurantByIdQueryVariables>(GET_RESTAURANT_BY_ID);
  // const GetResto = async (getRestaurantByIdId: string) => {
  //   try { await queryById({
  //     variables: { getRestaurantByIdId },
  //   }); } catch (error) {

  //   }
  // }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaderBoutton}>
        <Button title="Retour" onPress={() => navigation.navigate("Select")} />
        <Button
          title="Continuer"
          onPress={() => navigation.navigate("Ticket", { resto })}
        />
      </View>
      <SafeAreaView style={styles.mainContainer}>
        <Text style={styles.title}>Selectionnez votre restaurant</Text>
        <View style={styles.restaurantList}>
          {data?.getRestaurants.map((restaurant) => (
            <View key={restaurant.id}>
              <TouchableOpacity onPress={() => setRestoId(restaurant)} style={styles.boutonSelect}>
                <Restaurant {...restaurant} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RestaurantsScreen;

const styles = StyleSheet.create({
  container: { marginTop: 50, marginLeft: 50, marginRight: 50 },
  title: { fontSize: 32, fontWeight: "bold" },
  containerHeaderBoutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainContainer: {
    alignItems: 'center',
  },
  restaurantList: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignContent:"center",
    height: "90%",
    width: "80%",
  },
  boutonSelect: {
    alignItems:"center",
    justifyContent:"center",
    borderRadius: 10,
    borderWidth: 3,
    height: 200,
    width: 250,
    margin: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
