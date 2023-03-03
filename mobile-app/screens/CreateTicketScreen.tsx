import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackComponent,
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
  const [focus, setFocus] = React.useState(false);
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

  const cancel = () => {
    ticketContext?.initialState();
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaderBoutton}>
        <Pressable
          style={styles.navButton}
          onPress={() => navigation.navigate("Select")}
        >
          <Text style={styles.navButtonText}>Retour</Text>
        </Pressable>
      </View>
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContainer}>
            <View style={styles.infoPart}>
              <Text style={styles.title}>{resto.name} </Text>
              <Text style={styles.text}>Nombre de couverts : {ticketContext?.selectedId}</Text>
              <Text style={styles.text}>Pour valider votre demande, merci de renseigner votre adresse e-mail et/ou votre numéro de téléphone.</Text>
            </View>
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={focus ? styles.inputFocus : styles.input}
                    // onFocus={() => setFocus(true)}
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
                    style={focus ? styles.inputFocus : styles.input}
                    // onFocus={() => setFocus(true)}
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
                    style={focus ? styles.inputFocus : styles.input}
                    // onFocus={() => setFocus(true)}
                    onChangeText={onChangePhoneNumber}
                    value={phoneNumber}
                    placeholder="N° de téléphone"
                    keyboardType="phone-pad"
                  />
                )}
                name="phoneNumber"
              />
              <View style={styles.formButton}>
                <Pressable style={styles.cancelButton} onPress={cancel}>
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </Pressable>
                <Pressable
                  style={styles.submitButton}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.navButtonText}>Valider</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateTicketScreen;

const styles = StyleSheet.create({
  container: { marginTop: 50, marginLeft: 50, marginRight: 50 },
  title: { fontSize: 32, fontWeight: "bold" },
  text: { fontSize: 16, marginTop: 13},
  containerHeaderBoutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    width: 150,
    height: 70,
  },
  navButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "90%",
  },
  infoPart: {
    // borderWidth: 1,
    width: 350,
    height: "65%",
    flexDirection: "column",
  },
  input: {
    borderRadius: 5,
    height: 70,
    width: 500,
    marginBottom: 30,
    borderWidth: 1,
    padding: 10,
  },
  inputFocus: {
    borderRadius: 5,
    height: 70,
    width: 500,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "red",
    padding: 10,
  },
  formButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "darkblue",
    width: 150,
    height: 70,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    // elevation: 3,
    borderWidth: 2,
    borderColor: "darkblue",
    width: 150,
    height: 70,
  },
  cancelButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "darkblue",
  }
});
