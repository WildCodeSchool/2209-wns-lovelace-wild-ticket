import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { RootStackScreenProps } from "../types";
import React from "react";

const NotFoundScreen = ({ navigation }: RootStackScreenProps<"NotFound">) => {
  return (
    <View style={styles.notFoundScreenContainer}>
      <Text style={styles.notFoundScreenTitle}>This screen doesn't exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace("Home")}
        style={styles.notFoundscreenLink}
      >
        <Text style={styles.notFoundscreenLinkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  notFoundScreenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  notFoundScreenTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notFoundscreenLink: {
    marginTop: 15,
    paddingVertical: 15,
  },
  notFoundscreenLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
