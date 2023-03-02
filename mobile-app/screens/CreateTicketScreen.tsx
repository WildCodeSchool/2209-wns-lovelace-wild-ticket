import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import React, { useContext } from "react";
import { RootStackScreenProps } from "../types";
import { TicketContext } from "../context/TicketContext";
import { useMutation } from "@apollo/client";
import {
  CreateTicketMutation,
  CreateTicketMutationVariables,
} from "../gql/graphql";
import { CREATE_TICKET } from "../query/queries";

const CreateTicketScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"Ticket">) => {
  const ticketContext = useContext(TicketContext);
  const { resto } = route.params;
  const [firstName, onChangeFirstName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [phoneNumber, onChangePhoneNumber] = React.useState("");
  const [ticketNumber, setTicketNumber] = React.useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      email: "",
      phoneNumber: "",
    },
  });
  const [createTicket] = useMutation<
    CreateTicketMutation,
    CreateTicketMutationVariables
  >(CREATE_TICKET, {
    variables: {
      name: firstName,
      seats: ticketContext?.selectedId as number,
      restaurant: resto.id,
      email: email,
      phoneNumber: phoneNumber,
    },
    onCompleted: (data) => {
      setTicketNumber(data.createTicket.number);
      ToastAndroid.show("Request sent successfully!", ToastAndroid.SHORT);
      ticketContext?.initialState();
      navigation.navigate("Home");
    },
    onError: (error) => {
      ToastAndroid.show("Error!", ToastAndroid.SHORT);
    },
  });

  const onSubmit = async (data: any) => {
    await createTicket();
  };

  return (
    <View>
      <Button
        title="Retour"
        onPress={() => navigation.navigate("Restaurants")}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{resto.name} </Text>
        <Text>Nombre de couverts : {ticketContext?.selectedId}</Text>
        <Text>Temps d’attente estimé :</Text>
      </View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChangeFirstName}
            value={firstName}
            placeholder="Nom et prénom"
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChangePhoneNumber}
            value={phoneNumber}
            placeholder="N° de téléphone"
            keyboardType="phone-pad"
          />
        )}
        name="phoneNumber"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default CreateTicketScreen;

const styles = StyleSheet.create({
  container: { marginTop: 50, marginLeft: 50, marginRight: 50 },
  title: { fontSize: 32, fontWeight: "bold" },
  mainContainer: {
    alignItems: "center",
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
