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
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import React, { useContext } from "react";
import { RootStackScreenProps } from "../types";
import { TicketContext } from "../context/TicketContext";
import { useMutation } from "@apollo/client";
import Modal from "react-native-modal";
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
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisibleValidation, setModalVisibleValidation] = React.useState(false);
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
      <Modal backdropOpacity={0.7} isVisible={modalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Voulez-vous annuler votre demande et retourner à l'accueil ?
          </Text>
          <View style={styles.modalButton}>
            <Pressable style={styles.modalButtons} onPress={() => setModalVisible(false) }>
              <Text style={styles.navButtonText}>Non</Text>
            </Pressable>
            <Pressable style={styles.modalButtons}>
              <Text style={styles.navButtonText} onPress={cancel}>
                Oui
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal backdropOpacity={0.7} isVisible={modalVisibleValidation}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Voulez-vous confirmez-vous votre demande de table ?
          </Text>
          <View style={styles.modalButton}>
            <Pressable style={styles.modalButtonsValidation} onPress={() => setModalVisibleValidation(false) }>
              <Text style={styles.navButtonText}>Annuler</Text>
            </Pressable>
            <Pressable style={styles.modalButtonsValidation}>
              <Text style={styles.navButtonText} onPress={handleSubmit(onSubmit)}>
                Confirmer
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.containerHeaderButton}>
        <Pressable
          style={styles.navButton}
          onPress={() => navigation.navigate("Restaurants")}
        >
          <Text style={styles.navButtonText}>Retour</Text>
        </Pressable>
      </View>
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContainer}>
            <View style={styles.infoPart}>
              <Text style={styles.title}>{resto.name} </Text>
              <Text style={styles.text}>
                Nombre de couverts : {ticketContext?.selectedId}
              </Text>
              <Text style={styles.text}>
                Pour valider votre demande, merci de renseigner votre adresse
                e-mail et/ou votre numéro de téléphone.
              </Text>
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
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </Pressable>
                <Pressable
                  style={styles.submitButton}
                  onPress={() => setModalVisibleValidation(true)}
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
  text: { fontSize: 16, marginTop: 13 },
  containerHeaderButton: {
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
    width: 350,
    height: "65%",
    flexDirection: "column",
  },
  input: {
    borderRadius: 5,
    height: 70,
    width: 500,
    marginBottom: 30,
    borderWidth: 3,
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
  },
  modalView: {
    width: "50%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 50,
  },
  modalText: {
    fontSize: 28,
    alignSelf: "center",
    textAlign:"center",
  },
  modalButtons: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    width: 100,
    height: 70,
  },
  modalButtonsValidation: {
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
});
