import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Restaurant = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  return <Text style={styles.restaurantCard}>{name}</Text>;
};

export default Restaurant;

const styles = StyleSheet.create({
  restaurantCard: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 12,
    marginTop: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
});
