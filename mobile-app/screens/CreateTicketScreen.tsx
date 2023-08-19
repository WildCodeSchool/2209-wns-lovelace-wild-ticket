import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
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
import CPModal from "../components/ConfidentialityPolicyModal";
import formValidations from "../services/FormValidations";
import CGUModal from "../components/CGUModal";
import TicketCancelModal from "../components/TicketCancelModal";
import TicketConfirmModal from "../components/TicketConfirmModal";

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
  const [formErrors, setFormErrors] = React.useState<string | null>();
  const [modalTicketCancelVisible, setModalTicketCancelVisible] =
    React.useState(false);
  const [modalTicketConfirmVisible, setModalTicketConfirmVisible] =
    React.useState(false);
  const [modalCGUVisible, setModalCGUVisible] = React.useState(false);
  const [modalConfidentialityVisible, setModalConfidentialityVisible] =
    React.useState(false);

  const { control } = useForm({
    defaultValues: {
      firstName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const newTicketNumber = async (newTicketNumber: any) => {
    ticketContext?.setTicketNumber(newTicketNumber);
  };

  const [createTicket] = useMutation<
    CreateTicketMutation,
    CreateTicketMutationVariables
  >(CREATE_TICKET, {
    notifyOnNetworkStatusChange: true,
    variables: {
      name: firstName,
      seats: ticketContext?.selectedId as number,
      restaurant: resto.id,
      email: email.toLowerCase(),
      phoneNumber: phoneNumber,
    },
    onCompleted: async (data) => {
      await newTicketNumber(data.createTicket.number);
    },
    onError: () => {
      ToastAndroid.show(
        "Erreur critique. Merci de vous renseigner auprès d'un restaurant.",
        ToastAndroid.SHORT
      );
    },
  });

  const onSubmit = async () => {
    setFormErrors(null);
    const formErrors = await formValidations(firstName, email, phoneNumber);
    if (formErrors) {
      setFormErrors(formErrors);
      setModalTicketConfirmVisible(false);
      return;
    }
    setModalTicketConfirmVisible(false);
    await createTicket();
    navigation.navigate("TicketConfirm", { resto });
  };

  const ticketCancel = () => {
    ticketContext?.initialState();
    navigation.navigate("Home");
  };

  const closeCGUModal = () => {
    setModalCGUVisible(false);
  };

  const closeCPModal = () => {
    setModalConfidentialityVisible(false);
  };

  const closeTicketCancelModal = () => {
    setModalTicketCancelVisible(false);
  };

  const closeTicketValidationModal = () => {
    setModalTicketConfirmVisible(false);
  };

  return (
    <ImageBackground source={background} style={styles.imageBackground}>
      <View style={styles.createTicketScreenContainer}>
        <Modal backdropOpacity={0.7} isVisible={modalCGUVisible}>
          <CGUModal closeButtonAction={closeCGUModal} />
        </Modal>
        <Modal backdropOpacity={0.7} isVisible={modalConfidentialityVisible}>
          <CPModal closeButtonAction={closeCPModal} />
        </Modal>
        <Modal backdropOpacity={0.7} isVisible={modalTicketCancelVisible}>
          <TicketCancelModal
            closeButtonAction={closeTicketCancelModal}
            ticketCancelAction={ticketCancel}
          />
        </Modal>
        <Modal backdropOpacity={0.7} isVisible={modalTicketConfirmVisible}>
          <TicketConfirmModal
            closeButtonAction={closeTicketValidationModal}
            ticketConfirmAction={onSubmit}
          />
        </Modal>
        <View style={styles.createTicketScreenHeader}>
          <TouchableOpacity
            style={styles.createTicketScreenButton}
            onPress={() => navigation.navigate("Restaurants")}
          >
            <Text style={styles.createTicketScreenButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.createTicketScreenMain}>
              <View style={styles.createTicketScreenTicketRecapContainer}>
                <View
                  style={styles.createTicketScreenTicketRecapPictureContainer}
                >
                  <Image
                    style={styles.createTicketScreenTicketRecapPicture}
                    source={{ uri: resto.picture }}
                  ></Image>
                </View>
                <View>
                  <Text style={styles.createTicketScreenTicketRecapText}>
                    Restaurant :{" "}
                    <Text style={styles.createTicketScreenTicketRecapGreenText}>
                      {resto.name}
                    </Text>
                  </Text>
                  <Text style={styles.createTicketScreenTicketRecapText}>
                    Nombre de couverts :
                    <Text style={styles.createTicketScreenTicketRecapGreenText}>
                      {" "}
                      {ticketContext?.selectedId}
                    </Text>
                  </Text>
                  <Text style={styles.createTicketScreenTicketRecapExplText}>
                    Pour valider votre demande, merci de renseigner votre
                    adresse e-mail et/ou votre numéro de téléphone.
                  </Text>
                </View>
              </View>
              <View style={styles.createTicketScreenTicketFormContainer}>
                <Controller
                  control={control}
                  render={() => (
                    <TextInput
                      style={styles.createTicketScreenTicketFormInput}
                      onChangeText={onChangeFirstName}
                      value={firstName}
                      placeholder="Nom et/ou prénom"
                    />
                  )}
                  name="firstName"
                />

                <Controller
                  control={control}
                  render={() => (
                    <TextInput
                      style={styles.createTicketScreenTicketFormInput}
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
                  render={() => (
                    <TextInput
                      style={styles.createTicketScreenTicketFormInput}
                      onChangeText={onChangePhoneNumber}
                      value={phoneNumber}
                      placeholder="N° de téléphone"
                      keyboardType="phone-pad"
                    />
                  )}
                  name="phoneNumber"
                />
                {formErrors && (
                  <Text style={styles.createTicketScreenTicketFormErrorText}>
                    {formErrors}
                  </Text>
                )}
                <Text style={styles.createTicketScreenTicketFormText}>
                  En cliquant sur "Valider", je reconnais avoir lu et accepté
                  les{" "}
                  <Text
                    style={styles.createTicketScreenTicketFormUndelinedText}
                    onPress={() => {
                      setModalCGUVisible(true);
                    }}
                  >
                    conditions générales d'utilisation
                  </Text>{" "}
                  et la{" "}
                  <Text
                    style={styles.createTicketScreenTicketFormUndelinedText}
                    onPress={() => {
                      setModalConfidentialityVisible(true);
                    }}
                  >
                    politique de confidentialité
                  </Text>{" "}
                  de R'Ticket.
                </Text>
                <View
                  style={styles.createTicketScreenTicketFormButtonContainer}
                >
                  <TouchableOpacity
                    style={styles.createTicketScreenButton}
                    onPress={() => setModalTicketCancelVisible(true)}
                  >
                    <Text style={styles.createTicketScreenButtonText}>
                      Annuler
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.createTicketScreenButton}
                    onPress={() => setModalTicketConfirmVisible(true)}
                  >
                    <Text style={styles.createTicketScreenButtonText}>
                      Valider
                    </Text>
                  </TouchableOpacity>
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
  imageBackground: {
    flex: 1,
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  createTicketScreenContainer: {
    marginTop: 60,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
  },
  createTicketScreenHeader: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 40,
  },
  createTicketScreenButton: {
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
  createTicketScreenButtonText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#424242",
  },
  createTicketScreenMain: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "90%",
  },
  createTicketScreenTicketRecapContainer: {
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
  createTicketScreenTicketRecapPictureContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  createTicketScreenTicketRecapPicture: {
    width: 200,
    height: 200,
  },
  createTicketScreenTicketRecapText: {
    fontSize: 18,
    marginTop: 13,
    fontWeight: "bold",
  },
  createTicketScreenTicketRecapGreenText: {
    color: "#02C900",
  },
  createTicketScreenTicketRecapExplText: {
    fontSize: 18,
    marginTop: 13,
    fontWeight: "bold",
    paddingTop: 40,
  },
  createTicketScreenTicketFormContainer: {
    height: "75%",
    width: "45%",
    justifyContent: "center",
  },
  createTicketScreenTicketFormInput: {
    borderRadius: 5,
    backgroundColor: "#F4F2EA",
    height: 70,
    width: "100%",
    elevation: 1,
    marginBottom: 25,
    padding: 10,
    fontSize: 22,
  },
  createTicketScreenTicketFormText: {
    fontSize: 16,
    marginTop: 13,
    fontWeight: "bold",
    textAlign: "justify",
  },
  createTicketScreenTicketFormUndelinedText: {
    textDecorationLine: "underline",
  },
  createTicketScreenTicketFormButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  createTicketScreenTicketFormErrorText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
});
