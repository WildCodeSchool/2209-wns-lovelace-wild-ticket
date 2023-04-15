import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { RootStackScreenProps } from "../types";

const background = {
  uri: "https://i.ibb.co/j3bbZdt/r-ticket-background.png",
};

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
  return (
    <ImageBackground
      source={background}
      resizeMode="stretch"
      style={styles.imageBackground}
    >
      <View style={styles.homeScreenContainer}>
        <Pressable
          onPress={() => navigation.navigate("Select")}
          style={styles.homeScreenButton}
        >
          <Text style={styles.homeScreenButtonText}>
            Appuyez pour continuer
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  homeScreenContainer: {
    flex: 1,
  },
  homeScreenButton: {
    position: "absolute",
    bottom: 160,
    right: 260,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "none",
    borderWidth: 4,
    borderColor: "#e4cf63",
    height: 90,
    width: 300,
  },
  homeScreenButtonText: {
    fontSize: 24,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#e4cf63",
  },
});
