import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext } from "react";
import { RootStackScreenProps } from "../types";
import { TicketContext } from "../context/TicketContext";

const CreateTicketScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"Ticket">) => {
  const ticketContext = useContext(TicketContext);
  const { resto } = route.params;
  const [firstName, onChangeFirstName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [number, onChangeNumber] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaderBoutton}>
        <Button
          title="Retour"
          onPress={() => navigation.navigate("Restaurants")}
        />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{resto.name} </Text>
        <Text>Nombre de couverts : {ticketContext?.selectedId}</Text>
        <Text>Temps d’attente estimé :</Text>
      </View>
      <View>
        <Text>Formulaire</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeFirstName}
            value={firstName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Phone number"
            keyboardType="phone-pad"
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default CreateTicketScreen;

const styles = StyleSheet.create({
  container: { marginTop: 50, marginLeft: 50, marginRight: 50 },
  title: {fontSize: 32, fontWeight: "bold"},
  mainContainer: {
    alignItems: 'center',
  },
  containerHeaderBoutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
