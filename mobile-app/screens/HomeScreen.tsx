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
      style={styles.background}
    >
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.navigate("Select")}
          style={styles.button}
        >
          <Text style={styles.text}>Appuyez pour continuer</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
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
  text: {
    fontSize: 24,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#e4cf63",
  },
});
