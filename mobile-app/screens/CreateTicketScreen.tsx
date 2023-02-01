import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../types";

const CreateTicketScreen = ({ navigation }: RootStackScreenProps<"Ticket">) => {
  return (
    <View>
      <Button
        title="Retour"
        onPress={() => navigation.navigate("Restaurants")}
      />
      <View>
        <Text>Infos restaurant</Text>
      </View>
      <View>
        <Text>Formulaire</Text>
      </View>
    </View>
  );
};

export default CreateTicketScreen;

const styles = StyleSheet.create({});
