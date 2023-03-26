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
  return picture ? (
    <>
      <Image style={styles.picture} source={{ uri: picture }} />
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
