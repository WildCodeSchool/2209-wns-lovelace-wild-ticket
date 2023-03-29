import { StyleSheet, Image, Text, View } from "react-native";
import React from "react";
import { RESTAURANT_TYPE } from "../types/DataTypes";

const Restaurant = ({
  id,
  name,
  openAt,
  closeAt,
  picture,
}: RESTAURANT_TYPE) => {
  const isRestaurantClosed = (openAt: any, closeAt: any) => {
    return new Date(openAt) > new Date() || new Date(closeAt) < new Date()
      ? true
      : false;
  };

  return picture ? (
    <>
      <Image
        style={styles.picture}
        source={{ uri: picture }}
        blurRadius={isRestaurantClosed(openAt, closeAt) ? 10 : 0}
      />
    </>
  ) : (
    <>
      <Text style={styles.restaurantCard}>{name}</Text>
    </>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  picture: {
    width: 200,
    height: 200,
  },
  restaurantCard: {
    fontSize: 24,
  },
});
