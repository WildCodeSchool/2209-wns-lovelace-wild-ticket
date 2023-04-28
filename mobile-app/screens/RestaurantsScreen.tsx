import {
  ImageBackground,
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
    <ImageBackground source={background} style={styles.imageBackground}>
      <View style={styles.restaurantScreenContainer}>
        <View style={styles.restaurantScreenHeader}>
          <TouchableOpacity
            style={styles.restaurantScreenHeaderButton}
            onPress={() => navigation.navigate("Select")}
          >
            <Text style={styles.restaurantScreenHeaderButtonText}>Retour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.restaurantScreenHeaderButton}
            onPress={() => navigation.navigate("Ticket", { resto })}
            disabled={ticketContext?.isDisabled}
          >
            <Text
              style={
                ticketContext?.isDisabled
                  ? [
                      styles.restaurantScreenHeaderButtonText,
                      styles.restaurantScreenHeaderButtonTextDisabled,
                    ]
                  : styles.restaurantScreenHeaderButtonText
              }
            >
              Continuer
            </Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.restaurantScreenMain}>
          <Text style={styles.restaurantScreenMainTitle}>
            Selectionnez votre restaurant
          </Text>
          <View style={styles.restaurantScreenMainList}>
            <View style={styles.restaurantScreenMainRestaurants}>
              {data?.getPaginateRestaurantsByPole.restaurants.map(
                (restaurant) => (
                  <View key={restaurant.id}>
                    <TouchableOpacity
                      disabled={
                        new Date(restaurant.openAt) > new Date() ||
                        new Date(restaurant.closeAt) < new Date()
                          ? true
                          : false
                      }
                      onPress={() => handleClick(restaurant)}
                      style={[
                        new Date(restaurant.openAt) > new Date() ||
                        new Date(restaurant.closeAt) < new Date()
                          ? styles.restaurantScreenMainRestaurantButton
                          : ticketContext?.isActive === restaurant
                          ? [
                              styles.restaurantScreenMainRestaurantButton,
                              styles.restaurantScreenMainRestaurantActiveButton,
                            ]
                          : styles.restaurantScreenMainRestaurantButton,
                      ]}
                    >
                      <Restaurant {...restaurant} />
                      {new Date(restaurant.openAt) > new Date() ||
                      new Date(restaurant.closeAt) < new Date() ? (
                        <Text
                          style={
                            styles.restaurantScreenMainRestaurantDisabledButtonText
                          }
                        >
                          RÉSERVATION IMPOSSIBLE
                        </Text>
                      ) : null}
                    </TouchableOpacity>
                  </View>
                )
              )}
            </View>
            <View style={styles.restaurantScreenMainPagination}>
              <TouchableOpacity
                style={styles.restaurantScreenMainPaginationButton}
                onPress={() => pageDown()}
              >
                <Text style={styles.restaurantScreenMainPaginationButtonText}>
                  ↑
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.restaurantScreenMainPaginationButton}
                onPress={() => pageUp()}
              >
                <Text style={styles.restaurantScreenMainPaginationButtonText}>
                  ↓
                </Text>
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
  imageBackground: {
    flex: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  restaurantScreenContainer: {
    marginTop: 35,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
  },
  restaurantScreenHeader: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  restaurantScreenHeaderButton: {
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
  restaurantScreenHeaderButtonText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#424242",
  },
  restaurantScreenHeaderButtonTextDisabled: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "lightgrey",
  },
  restaurantScreenMain: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  restaurantScreenMainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  restaurantScreenMainList: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    height: "79%",
    width: "100%",
  },
  restaurantScreenMainRestaurants: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "auto",
    width: "76%",
  },
  restaurantScreenMainRestaurantButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F2EA",
    elevation: 3,
    borderRadius: 10,
    height: 230,
    width: 300,
    margin: 10,
  },
  restaurantScreenMainRestaurantActiveButton: {
    borderWidth: 4,
    borderColor: "#02C900",
  },
  restaurantScreenMainRestaurantDisabledButtonText: {
    textAlignVertical: "center",
    textAlign: "center",
    width: 230,
    height: 70,
    backgroundColor: "white",
    opacity: 0.9,
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "black",
    position: "absolute",
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
  },
  restaurantScreenMainPagination: {
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    height: "auto",
    margin: 5,
  },
  restaurantScreenMainPaginationButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F2EA",
    elevation: 3,
    borderRadius: 10,
    height: 100,
    width: 100,
    margin: 5,
  },
  restaurantScreenMainPaginationButtonText: {
    fontSize: 48,
    fontWeight: "bold",
  },
});
