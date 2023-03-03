import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { RootStackScreenProps } from "../types";
import { RestaurantsQuery } from "../gql/graphql";
import { GET_RESTAURANTS } from "../query/queries";
import { TicketContext } from "../context/TicketContext";
import Restaurant from "../components/Restaurant";

const RestaurantsScreen = ({
  navigation,
}: RootStackScreenProps<"Restaurants">) => {
  const { data } = useQuery<RestaurantsQuery>(GET_RESTAURANTS);
  const [resto, setResto] = useState<any | null>("");
  const ticketContext = useContext(TicketContext);

  const handleClick = (id: any) => {
    setResto(id);
    ticketContext?.setIsDisabled(false);
    ticketContext?.setIsActive(id);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      ticketContext?.setIsDisabled(true);
      ticketContext?.setIsActive(0);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaderBoutton}>
       <Pressable style={styles.navButton} onPress={() => navigation.navigate("Select")}>
          <Text style={styles.navButtonText}>Retour</Text>
        </Pressable>
        <Pressable style={ticketContext?.isDisabled ? styles.navButtonDisable : styles.navButton}
          onPress={() => navigation.navigate("Ticket" , { resto })}
          disabled={ticketContext?.isDisabled}
        >
          <Text style={styles.navButtonText}>Continuer</Text>
        </Pressable>
      </View>
      <SafeAreaView style={styles.mainContainer}>
        <Text style={styles.title}>Selectionnez votre restaurant</Text>
        <View style={styles.restaurantList}>
          {data?.getRestaurants.map((restaurant) => (
            <View key={restaurant.id}>
              <TouchableOpacity
                onPress={() => handleClick(restaurant)}
                style={ ticketContext?.isActive === restaurant ? styles.boutonSelectActive : styles.boutonSelect }
              >
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
    marginBottom: 10,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: 150,
    height: 70,
  },
  navButtonDisable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'grey',
    width: 150,
    height: 70,
  },
  navButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  mainContainer: {
    alignItems: "center",
  },
  restaurantList: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    height: "85%",
    width: "80%",
    margin: 5
  },
  boutonSelect: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 3,
    height: 200,
    width: 250,
    margin: 20,
  },
  boutonSelectActive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'pink',
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
