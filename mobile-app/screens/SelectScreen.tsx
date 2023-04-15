import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext } from "react";
import { RootStackScreenProps } from "../types";
import { TicketContext } from "../context/TicketContext";
import { DATA as capacities } from "../data/dataSelect";

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
    <ImageBackground source={background} style={styles.imageBackground}>
      <View style={styles.selectScreenContainer}>
        <View style={styles.selectScreenHeader}>
          <TouchableOpacity
            style={styles.selectScreenHeaderButton}
            onPress={() => cancel()}
          >
            <Text style={styles.selectScreenHeaderButtonText}>Retour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectScreenHeaderButton}
            onPress={() => navigation.navigate("Restaurants")}
            disabled={ticketContext?.isDisabled}
          >
            <Text
              style={
                ticketContext?.isDisabled
                  ? [
                      styles.selectScreenHeaderButtonText,
                      styles.selectScreenHeaderButtonDisabledText,
                    ]
                  : styles.selectScreenHeaderButtonText
              }
            >
              Continuer
            </Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.selectScreenMain}>
          <Text style={styles.selectScreenMainTitle}>
            Sélectionnez le nombre de couverts
          </Text>
          <View style={styles.selectScreenMainButtonContainer}>
            {capacities.map((capacity) => (
              <View key={capacity.id}>
                <TouchableOpacity
                  onPress={() => handleClick(capacity.id)}
                  style={
                    ticketContext?.isActive === capacity.id
                      ? [
                          styles.selectScreenMainButton,
                          styles.selectScreenMainActiveButton,
                        ]
                      : styles.selectScreenMainButton
                  }
                >
                  <Text style={styles.selectScreenMainButtonText}>
                    {capacity.id}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Text style={styles.selectScreenFooterText}>
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
  imageBackground: {
    flex: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  selectScreenContainer: {
    marginTop: 28,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
  },
  selectScreenHeader: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  selectScreenHeaderButton: {
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
  selectScreenHeaderButtonText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#424242",
  },
  selectScreenHeaderButtonDisabledText: {
    color: "lightgrey",
  },
  selectScreenMain: {
    width: "85%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 50,
    padding: 15,
  },
  selectScreenMainTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  selectScreenMainButtonContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    height: "75%",
    width: "80%",
  },
  selectScreenMainButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F2EA",
    elevation: 3,
    borderRadius: 10,
    height: 150,
    width: 150,
    margin: 20,
  },
  selectScreenMainActiveButton: {
    borderWidth: 4,
    borderColor: "#02C900",
  },
  selectScreenMainButtonText: {
    fontSize: 32,
  },
  selectScreenFooterText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
