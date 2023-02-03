import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import React, { useContext, useState } from "react";
import { RootStackScreenProps } from "../types";
import { TicketContext } from "../context/TicketContext";

const DATA = [
  {
    id: "1",
    title: "1",
  },
  {
    id: "2",
    title: "2",
  },
  {
    id: "3",
    title: "3",
  },
  {
    id: "4",
    title: "4",
  },
  {
    id: "5",
    title: "5",
  },
  {
    id: "6",
    title: "6",
  },
  {
    id: "7",
    title: "7",
  },
  {
    id: "8",
    title: "8",
  },
];

const SelectScreen = ({ navigation }: RootStackScreenProps<"Select">) => {
  const ticketContext = useContext(TicketContext);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaderBoutton}>
        <Button title="Retour" onPress={() => navigation.navigate("Home")} />
        <Button
          title="Continuer"
          onPress={() => navigation.navigate("Restaurants")}
        />
      </View>
      <SafeAreaView style={styles.mainContainer}>
        <Text>Sélectionnez le nombre de couverts</Text>
        <View style={styles.containerButton}>
          {DATA.map((d) => (
            <View key={d.id}>
              <TouchableOpacity
                onPress={() => {ticketContext?.setSelectedId(d.id)}}
                style={styles.boutonSelect}
              >
                <Text>{d.id}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Text>
          Pour plus de 8 couverts, merci de vous renseigner directement auprès
          du restaurant souhaité.
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default SelectScreen;

const styles = StyleSheet.create({
  container: { marginTop: 50, marginLeft: 50, marginRight: 50 },
  containerHeaderBoutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainContainer: {
    alignItems: 'center',
  },
  containerButton: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    height: "90%",
    width: "80%",
    borderWidth: 5,
    borderColor: "red",
  },
  boutonSelect: {
    borderRadius: 10,
    borderWidth: 3,
    height: 150,
    width: 150,
    margin: 20,
  },
  button: {
    borderRadius: 10,
    height: 60,
    width: 225,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
