import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import React, { useContext } from "react";
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
  const handleClick = (id: any) => {
    ticketContext?.setSelectedId(id)
    ticketContext?.setIsDisabled(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaderBoutton}>
        <Button title="Retour" onPress={() => navigation.navigate("Home")} />
        <Button
          title="Continuer"
          onPress={() => navigation.navigate("Restaurants")} disabled={ticketContext?.isDisabled}
        />
      </View>
      <SafeAreaView style={styles.mainContainer}>
        <Text style={styles.title}>Sélectionnez le nombre de couverts</Text>
        <View style={styles.containerButton}>
          {DATA.map((d) => (
            <View key={d.id}>
              <TouchableOpacity
                onPress={() => handleClick(d.id)}
                style={styles.boutonSelect}
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
  title: {fontSize: 32, fontWeight: "bold"},
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
    alignContent:"center",
    height: "90%",
    width: "80%",
  },
  boutonSelect: {
    alignItems:"center",
    justifyContent:"center",
    borderRadius: 10,
    borderWidth: 3,
    height: 150,
    width: 150,
    margin: 20,
  },
  textButton: {
    fontSize: 32
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
