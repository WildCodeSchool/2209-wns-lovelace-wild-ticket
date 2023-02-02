import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { RootStackScreenProps } from "../types";

const CreateTicketScreen = ({ navigation, route }: RootStackScreenProps<"Ticket">) => {
  const { resto } = route.params;
  const [firstName, onChangeFirstName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [number, onChangeNumber] = React.useState("");

  return (
    <View>
      <Button
        title="Retour"
        onPress={() => navigation.navigate("Restaurants")}
      />
      <View>
        <Text>Infos restaurant</Text>
        <Text>Restaurant : {resto.name}  </Text>
        <Text>Nombre de couverts :</Text>
        <Text>Temps d’attente estimé :</Text>
      </View>
      <View>
        <Text>Formulaire</Text>
        <SafeAreaView>
          <TextInput style={styles.input} onChangeText={onChangeFirstName} value={firstName} placeholder="Name"/>
          <TextInput style={styles.input} onChangeText={onChangeEmail} value={email} placeholder="Email" keyboardType="email-address" />
          <TextInput style={styles.input}
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
