import {
  ImageBackground,
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
import {
  GetPaginateRestaurantsByPoleQuery,
  GetPaginateRestaurantsByPoleQueryVariables,
} from "../gql/graphql";
import { GET_PAGINATED_RESTAURANTS_BY_POLE } from "../query/queries";
import { TicketContext } from "../context/TicketContext";
import Restaurant from "../components/Restaurant";

const background = {
  uri: "https://i.ibb.co/YdC5MQR/RTicket-Wallpaper-2.png",
};

const RestaurantsScreen = ({
  navigation,
}: RootStackScreenProps<"Restaurants">) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { data } = useQuery<
    GetPaginateRestaurantsByPoleQuery,
    GetPaginateRestaurantsByPoleQueryVariables
  >(GET_PAGINATED_RESTAURANTS_BY_POLE, {
    variables: {
      pole: "Pôle de Lyon",
      pageNumber: pageNumber as number,
    },
    fetchPolicy: "cache-and-network",
  });
  const [resto, setResto] = useState<any | null>("");
  const ticketContext = useContext(TicketContext);

  const handleClick = (id: any) => {
    setResto(id);
    ticketContext?.setIsDisabled(false);
    ticketContext?.setIsActive(id);
  };

  const pageUp = () => {
    data?.getPaginateRestaurantsByPole.nextPageNumber
      ? setPageNumber(data?.getPaginateRestaurantsByPole.nextPageNumber)
      : null;
  };

  const pageDown = () => {
    (pageNumber as number) > 1
      ? setPageNumber((pageNumber as number) - 1)
      : null;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      ticketContext?.setIsDisabled(true);
      ticketContext?.setIsActive(0);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerHeaderButton}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Select")}
          >
            <Text style={styles.navButtonText}>Retour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              ticketContext?.isDisabled
                ? styles.navButtonDisable
                : styles.navButton
            }
            onPress={() => navigation.navigate("Ticket", { resto })}
            disabled={ticketContext?.isDisabled}
          >
            <Text
              style={
                ticketContext?.isDisabled
                  ? styles.navButtonTextDisabled
                  : styles.navButtonText
              }
            >
              Continuer
            </Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.mainContainer}>
          <Text style={styles.title}>Selectionnez votre restaurant</Text>
          <View style={styles.restaurantList}>
            <View style={styles.restaurants}>
              {data?.getPaginateRestaurantsByPole.restaurants.map(
                (restaurant) => (
                  <View key={restaurant.id}>
                    <TouchableOpacity
                      onPress={() => handleClick(restaurant)}
                      style={
                        ticketContext?.isActive === restaurant
                          ? styles.boutonSelectActive
                          : styles.boutonSelect
                      }
                    >
                      <Restaurant {...restaurant} />
                    </TouchableOpacity>
                  </View>
                )
              )}
            </View>
            <View style={styles.pagination}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => pageUp()}
              >
                <Text style={styles.paginationText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => pageDown()}
              >
                <Text style={styles.paginationText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default RestaurantsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  container: {
    marginTop: 35,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
  },
  containerHeaderButton: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 8,
    backgroundColor: "#F4F2EA",
    width: 180,
    height: 70,
  },
  navButtonText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#424242",
  },
  navButtonTextDisabled: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "lightgrey",
  },
  navButtonDisable: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 8,
    backgroundColor: "#F4F2EA",
    width: 180,
    height: 70,
  },
  mainContainer: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    //padding: 15,
  },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 20 },
  restaurantList: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "79%",
    width: "90%",
  },
  restaurants: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "auto",
    width: "80%",
    //margin: 5,
  },
  boutonSelect: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F2EA",
    elevation: 3,
    borderRadius: 10,
    height: 230,
    width: 300,
    margin: 10,
  },
  boutonSelectActive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F2EA",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#02C900",
    height: 230,
    width: 300,
    margin: 10,
  },
  pagination: {
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    height: "auto",
    width: "20%",
    margin: 5,
  },
  paginationButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F2EA",
    elevation: 3,
    borderRadius: 10,
    height: 100,
    width: 100,
    margin: 5,
  },
  paginationText: {
    fontSize: 36,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
