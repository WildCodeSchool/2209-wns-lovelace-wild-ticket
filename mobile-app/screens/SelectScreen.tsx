import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { RootStackScreenProps } from "../types";
import { TicketContext } from "../context/TicketContext";
import { DATA } from "../data/dataSelect";

const background = {
  uri: "https://i.ibb.co/YdC5MQR/RTicket-Wallpaper-2.png",
};

const SelectScreen = ({ navigation }: RootStackScreenProps<"Select">) => {
  const ticketContext = useContext(TicketContext);

  const handleClick = (id: any) => {
    ticketContext?.setSelectedId(id);
    ticketContext?.setIsDisabled(false);
    ticketContext?.setIsActive(id);
  };

  const cancel = () => {
    ticketContext?.initialState();
    navigation.navigate("Home");
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.containerHeaderBoutton}>
          <Pressable style={styles.navButton} onPress={() => cancel()}>
            <Text style={styles.navButtonText}>Retour</Text>
          </Pressable>
          <Pressable
            style={
              ticketContext?.isDisabled
                ? styles.navButtonDisable
                : styles.navButton
            }
            onPress={() => navigation.navigate("Restaurants")}
            disabled={ticketContext?.isDisabled}
          >
            <Text
              style={
                ticketContext?.isDisabled
                  ? styles.navButtonTextDisabled
                  : styles.navButtonText
              }
            >
              Continuer
            </Text>
          </Pressable>
        </View>
        <SafeAreaView style={styles.mainContainer}>
          <Text style={styles.title}>Sélectionnez le nombre de couverts</Text>
          <View style={styles.containerButton}>
            {DATA.map((d) => (
              <View key={d.id}>
                <TouchableOpacity
                  onPress={() => handleClick(d.id)}
                  style={
                    ticketContext?.isActive === d.id
                      ? styles.boutonSelectActive
                      : styles.boutonSelect
                  }
                >
                  <Text style={styles.textButton}>{d.id}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Text style={styles.textBottom}>
            Pour plus de 8 couverts, merci de vous renseigner directement auprès
            du restaurant souhaité.
          </Text>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default SelectScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  container: {
    marginTop: 28,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
  },
  containerHeaderBoutton: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 8,
    backgroundColor: "#F4F2EA",
    width: 180,
    height: 70,
  },
  navButtonText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#424242",
  },
  navButtonTextDisabled: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "lightgrey",
  },
  navButtonDisable: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 8,
    backgroundColor: "#F4F2EA",
    width: 180,
    height: 70,
  },
  mainContainer: {
    width: "85%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 50,
    padding: 15,
  },
  title: { fontSize: 32, fontWeight: "bold" },
  containerButton: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    height: "75%",
    width: "80%",
  },
  boutonSelect: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F2EA",
    elevation: 3,
    borderRadius: 10,
    height: 150,
    width: 150,
    margin: 20,
  },
  boutonSelectActive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F2EA",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#02C900",
    height: 150,
    width: 150,
    margin: 20,
  },
  textButton: {
    fontSize: 32,
  },
  textBottom: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
