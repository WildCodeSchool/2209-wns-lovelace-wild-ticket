import React, { useContext } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TicketContext } from "../context/TicketContext";
import { RootStackScreenProps } from "../types";

const background = {
  uri: "https://i.ibb.co/YdC5MQR/RTicket-Wallpaper-2.png",
};

const TicketConfirmationScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"TicketConfirm">) => {
  const { resto } = route.params;
  const ticketContext = useContext(TicketContext);
  const displayTicketNumber = ticketContext?.ticketNumber.toString() as string;

  const returnHome = () => {
    ticketContext?.initialState();
    navigation.navigate("Home");
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.confirmContainer}>
          <Text style={styles.titleText}>
            Vous intégrez la file d'attente pour le restaurant {resto.name}
          </Text>
          <Image
            style={styles.restoPicture}
            source={{ uri: resto.picture }}
          ></Image>
          <Text style={styles.ticketText}>
            TICKET N° {parseInt(displayTicketNumber.split("-")[2], 10)}
          </Text>
          <Text style={styles.delayText}>
            Vous recevrez un message par mail et/ou sms dès que la table sera
            disponible. Vous aurez ensuite 15 minutes pour vous présenter à
            l'accueil du restaurant. Passé ce délai, nous serons dans
            l'obligation de clôturer automatiquement ce ticket et ainsi libérer
            la table.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                returnHome();
              }}
            >
              <Text style={styles.buttonText}>Retour à l'accueil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default TicketConfirmationScreen;

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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "60%",
    height: "75%",
    marginTop: 140,
  },
  titleText: {
    fontSize: 26,
    textAlign: "center",
    paddingLeft: 70,
    paddingRight: 70,
  },
  ticketText: {
    fontSize: 36,
    textAlign: "center",
  },
  delayText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "justify",
  },
  restoPicture: { width: 150, height: 150 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#F4F2EA",
    width: 260,
    height: 70,
  },
  buttonText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#424242",
  },
});
