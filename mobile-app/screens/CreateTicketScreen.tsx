import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image,
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

const background = {
  uri: "https://i.ibb.co/YdC5MQR/RTicket-Wallpaper-2.png",
};

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
  const [modalVisibleValidation, setModalVisibleValidation] =
    React.useState(false);
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
      console.log(error.message);
      ToastAndroid.show("Error!", ToastAndroid.SHORT);
    },
  });

  const onSubmit = async (
    firstName: string,
    email: string,
    phoneNumber: string
  ) => {
    console.log({ firstName }, { email }, { phoneNumber });
    /*     try {
      await createTicket();
    } catch (error) {
      console.log(error);
    } */
  };

  const cancel = () => {
    ticketContext?.initialState();
    navigation.navigate("Home");
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <Modal backdropOpacity={0.7} isVisible={modalVisible}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Voulez-vous annuler votre demande et retourner à l'accueil ?
            </Text>
            <View style={styles.modalButton}>
              <Pressable
                style={styles.modalButtons}
                onPress={() => setModalVisible(false)}
              >
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
              <Pressable
                style={styles.modalButtonsValidation}
                onPress={() => setModalVisibleValidation(false)}
              >
                <Text style={styles.navButtonText}>Annuler</Text>
              </Pressable>
              <Pressable style={styles.modalButtonsValidation}>
                <Text
                  style={styles.navButtonText}
                  onPress={() => {
                    onSubmit(firstName, email, phoneNumber);
                  }}
                >
                  Confirmer
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.containerHeaderButton}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Restaurants")}
          >
            <Text style={styles.navButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer}>
              <View style={styles.infoPart}>
                <View style={styles.restoPictureContainer}>
                  <Image
                    style={styles.restoPicture}
                    source={{ uri: resto.picture }}
                  ></Image>
                </View>
                <View>
                  <Text style={styles.text}>
                    Restaurant :{" "}
                    <Text style={styles.greenText}>{resto.name}</Text>
                  </Text>
                  <Text style={styles.text}>
                    Nombre de couverts :
                    <Text style={styles.greenText}>
                      {" "}
                      {ticketContext?.selectedId}
                    </Text>
                  </Text>
                  <Text style={styles.textExpl}>
                    Pour valider votre demande, merci de renseigner votre
                    adresse e-mail et/ou votre numéro de téléphone.
                  </Text>
                </View>
              </View>
              <View style={styles.formContainer}>
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
                <Text style={styles.conditionsText}>
                  En cliquant sur "Valider", je reconnais avoir lu et accepté
                  les conditions générales d'utilisation et la politique de
                  confidentialité de R'Ticket.
                </Text>
                <View style={styles.formButton}>
                  <Pressable
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={styles.navButtonText}>Annuler</Text>
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
    </ImageBackground>
  );
};

export default CreateTicketScreen;

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
    marginTop: 60,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
  },
  containerHeaderButton: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 40,
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
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "90%",
  },
  infoPart: {
    width: "45%",
    height: "75%",
    flexDirection1: "column",
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 25,
    backgroundColor: "#F4F2EA",
    elevation: 3,
    borderRadius: 10,
  },
  restoPictureContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  restoPicture: {
    width: 200,
    height: 200,
  },
  text: { fontSize: 17, marginTop: 13, fontWeight: "bold" },
  greenText: {
    fontSize: 17,
    marginTop: 13,
    fontWeight: "bold",
    color: "#02C900",
  },
  textExpl: { fontSize: 17, marginTop: 13, fontWeight: "bold", paddingTop: 40 },
  formContainer: {
    height: "75%",
    width: "45%",
    justifyContent: "center",
  },
  conditionsText: {
    fontSize: 15,
    marginTop: 13,
    fontWeight: "bold",
  },
  input: {
    borderRadius: 5,
    backgroundColor: "#F4F2EA",
    height: 70,
    width: "100%",
    elevation: 1,
    marginBottom: 25,
    padding: 10,
    fontSize: 22,
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
    paddingTop: 20,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#F4F2EA",
    width: 180,
    height: 70,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#F4F2EA",
    width: 180,
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
    textAlign: "center",
  },
  modalButtons: {
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
  modalButtonsValidation: {
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
});
