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
    fontSize: 24,
  },
});
