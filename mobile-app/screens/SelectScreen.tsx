import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { RootStackScreenProps } from "../types";
import { TicketContext } from "../context/TicketContext";
import { DATA } from "../data/dataSelect";

const SelectScreen = ({ navigation }: RootStackScreenProps<"Select">) => {
  const ticketContext = useContext(TicketContext);

  const handleClick = (id: any) => {
    ticketContext?.setSelectedId(id);
    ticketContext?.setIsDisabled(false);
    ticketContext?.setIsActive(id)
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaderBoutton}>
        <Pressable style={styles.navButton} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.navButtonText}>Retour</Text>
        </Pressable>
        <Pressable style={ticketContext?.isDisabled ? styles.navButtonDisable : styles.navButton}
          onPress={() => navigation.navigate("Restaurants")}
          disabled={ticketContext?.isDisabled}
        >
          <Text style={styles.navButtonText}>Continuer</Text>
        </Pressable>
      </View>
      <SafeAreaView style={styles.mainContainer}>
        <Text style={styles.title}>Sélectionnez le nombre de couverts</Text>
        <View style={styles.containerButton}>
          {DATA.map((d) => (
            <View key={d.id}>
              <TouchableOpacity
                onPress={() => handleClick(d.id)}
                style={ ticketContext?.isActive === d.id ? styles.boutonSelectActive : styles.boutonSelect }
              >
                <Text style={styles.textButton}>{d.id}</Text>
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
  title: { fontSize: 32, fontWeight: "bold" },
  containerHeaderBoutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: 150,
    height: 70,
  },
  navButtonDisable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'grey',
    width: 150,
    height: 70,
  },
  navButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  mainContainer: {
    alignItems: "center",
  },
  containerButton: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    height: "75%",
    width: "80%",
    margin: 10
  },
  boutonSelect: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 3,
    height: 150,
    width: 150,
    margin: 20,
  },
  boutonSelectActive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'lightblue',
    borderRadius: 10,
    borderWidth: 3,
    height: 150,
    width: 150,
    margin: 20,
  },
  textButton: {
    fontSize: 32,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
