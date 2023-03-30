import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
  Image,
  ScrollView,
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
  const [formErrors, setFormErrors] = React.useState<string | null>();
  const [focus, setFocus] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisibleValidation, setModalVisibleValidation] =
    React.useState(false);
  const [modalCGVVisible, setModalCGVVisible] = React.useState(false);
  const [modalConfidentialityVisible, setModalConfidentialityVisible] =
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
    onError: (error) => {
      ToastAndroid.show(
        "Erreur critique. Merci de vous renseigner auprès d'un restaurant.",
        ToastAndroid.SHORT
      );
      setModalVisibleValidation(false);
    },
  });

  const onSubmit = async (
    firstName: string,
    email: string,
    phoneNumber: string,
    resto: any
  ) => {
    if (firstName.trim() == "") {
      setFormErrors("Merci de renseigner votre nom et prénom.");
      return;
    }
    if (email.trim() == "" && phoneNumber.trim() == "") {
      setFormErrors(
        "Merci de renseigner votre email et/ou numéro de téléphone."
      );
      return;
    } else if (
      email &&
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setFormErrors("Votre adresse email n'est pas au bon format.");
      return;
    } else if (phoneNumber && !phoneNumber.match(/^\d{10}$/)) {
      setFormErrors(
        "Merci de rentrer votre numéro de téléphone au format : XXXXXXXXXX."
      );
      return;
    }
    await createTicket();
    navigation.navigate("TicketConfirm", { resto });
  };

  const cancel = () => {
    ticketContext?.initialState();
    navigation.navigate("Home");
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <Modal backdropOpacity={0.7} isVisible={modalCGVVisible}>
          <SafeAreaView style={styles.modalCGV}>
            <ScrollView style={styles.CGVScrollView}>
              <View>
                <Text style={styles.CGVBigTitle}>
                  Conditions Générales d'Utilisation de R'Ticket{"\n"}
                </Text>
                <Text style={styles.CGVText}>
                  En utilisant l'application R'Ticket pour générer des tickets
                  de file d'attente dans les restaurants, vous acceptez les
                  présentes Conditions Générales d'Utilisation (CGU). Veuillez
                  lire attentivement les CGU avant d'utiliser l'application. Si
                  vous n'acceptez pas les CGU, veuillez ne pas utiliser
                  l'application.
                  {"\n"}
                </Text>
                <Text style={styles.CGVTitle}>
                  Utilisation de l'application{"\n"}
                </Text>
                <Text style={styles.CGVText}>
                  L'application R'Ticket est destinée à être utilisée pour
                  générer des tickets de file d'attente dans les restaurants.
                  Vous devez fournir votre adresse e-mail ou votre numéro de
                  téléphone pour recevoir votre ticket de file d'attente. Vous
                  êtes responsable de l'exactitude de toutes les informations
                  que vous fournissez lors de l'utilisation de l'application.
                  Vous ne pouvez pas utiliser l'application à des fins illégales
                  ou pour perturber le fonctionnement de l'application ou de
                  tout autre service connexe.{"\n"}
                </Text>
                <Text style={styles.CGVTitle}>
                  Propriété intellectuelle{"\n"}
                </Text>
                <Text style={styles.CGVText}>
                  L'application R'Ticket et tout son contenu, y compris les
                  textes, les graphiques, les logos, les images et les
                  logiciels, sont la propriété de R'Ticket et sont protégés par
                  les lois françaises et internationales sur les droits
                  d'auteur, les marques déposées et les autres lois sur la
                  propriété intellectuelle. Vous ne pouvez pas utiliser ou
                  reproduire le contenu de l'application sans l'autorisation
                  écrite préalable de R'Ticket.{"\n"}
                </Text>
                <Text style={styles.CGVTitle}>Responsabilité{"\n"}</Text>
                <Text style={styles.CGVText}>
                  R'Ticket n'est pas responsable des retards, des pertes ou des
                  dommages causés par l'utilisation de l'application. R'Ticket
                  ne garantit pas l'exactitude ou l'exhaustivité des
                  informations fournies par l'application. R'Ticket ne garantit
                  pas que l'application sera disponible en tout temps ou qu'elle
                  fonctionnera sans interruption ou sans erreur. Vous utilisez
                  l'application à vos propres risques.{"\n"}
                </Text>
                <Text style={styles.CGVTitle}>Confidentialité{"\n"}</Text>
                <Text style={styles.CGVText}>
                  R'Ticket est soucieux de la protection de votre vie privée.
                  Nous ne divulguerons pas votre adresse e-mail ou votre numéro
                  de téléphone en dehors du circuit de l'application. Veuillez
                  lire notre Politique de Confidentialité pour plus
                  d'informations sur la collecte, l'utilisation et la
                  divulgation de vos données personnelles.{"\n"}
                </Text>
                <Text style={styles.CGVTitle}>Modification des CGU{"\n"}</Text>
                <Text style={styles.CGVText}>
                  R'Ticket se réserve le droit de modifier les CGU à tout
                  moment. Nous vous encourageons à consulter régulièrement les
                  CGU pour vous assurer que vous êtes toujours d'accord avec
                  leur contenu.{"\n"}
                </Text>
                <Text style={styles.CGVTitle}>
                  Loi applicable et juridiction compétente{"\n"}
                </Text>
                <Text style={styles.CGVText}>
                  Les présentes CGU sont régies par la loi française. Tout
                  litige découlant de l'utilisation de l'application sera soumis
                  à la juridiction exclusive des tribunaux français.{"\n"}
                </Text>
                <Text style={styles.CGVTitle}>Nous contacter{"\n"}</Text>
                <Text style={styles.CGVText}>
                  Si vous avez des questions ou des préoccupations concernant
                  les présentes CGU, veuillez nous contacter à l'adresse e-mail
                  contact@rticket.com ou par téléphone au +33 6 12 34 56 78.
                  {"\n"}
                </Text>
              </View>
            </ScrollView>
            <View style={styles.CGVButtonContainer}>
              <TouchableOpacity
                style={styles.CGVButton}
                onPress={() => setModalCGVVisible(false)}
              >
                <Text style={styles.CGVButtonText}>Retour</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>

        <Modal backdropOpacity={0.7} isVisible={modalConfidentialityVisible}>
          <SafeAreaView style={styles.modalCGV}>
            <ScrollView style={styles.CGVScrollView}>
              <View>
                <Text style={styles.CGVBigTitle}>
                  Politique de confidentialité de R'Ticket{"\n"}
                </Text>
                <Text style={styles.CGVText}>
                  Chez R'Ticket, nous nous engageons à protéger la
                  confidentialité de vos données personnelles. Cette politique
                  de confidentialité décrit comment nous collectons, utilisons
                  et partageons vos informations lorsque vous utilisez notre
                  application pour générer des tickets de file d'attente dans
                  les restaurants.
                  {"\n"}
                </Text>
                <Text style={styles.CGVTitle}>
                  Collecte de données personnelles{"\n"}
                </Text>
                <Text style={styles.CGVText}>
                  Lorsque vous utilisez notre application, nous collectons votre
                  adresse e-mail ou votre numéro de téléphone portable. Nous ne
                  collectons pas d'autres données personnelles vous concernant.
                  Nous utilisons ces informations pour vous envoyer votre ticket
                  de file d'attente et pour vous envoyer des mises à jour sur
                  votre position dans la file d'attente, si vous avez choisi de
                  les recevoir.{"\n"}
                </Text>
                <Text style={styles.CGVTitle}>
                  Utilisation des données personnelles{"\n"}
                </Text>
                <Text style={styles.CGVText}>
                  Nous utilisons vos données personnelles uniquement pour vous
                  fournir les services que vous avez demandés. Nous ne vendrons
                  pas vos données personnelles à des tiers ni ne les partagerons
                  avec des tiers, sauf si cela est nécessaire pour vous fournir
                  le service que vous avez demandé. Par exemple, nous pouvons
                  partager vos données personnelles avec le restaurant que vous
                  avez choisi afin qu'ils puissent suivre votre position dans la
                  file d'attente.{"\n"}
                </Text>
                <Text style={styles.CGVTitle}>
                  Sécurité des données personnelles{"\n"}
                </Text>
                <Text style={styles.CGVText}>
                  Nous prenons des mesures techniques et organisationnelles
                  appropriées pour protéger vos données personnelles contre tout
                  accès, modification, divulgation ou destruction non autorisés.
                  Nous ne conserverons vos données personnelles que pendant la
                  durée nécessaire pour fournir les services que vous avez
                  demandés.{"\n"}
                </Text>
                <Text style={styles.CGVTitle}>Vos droits{"\n"}</Text>
                <Text style={styles.CGVText}>
                  Vous avez le droit de demander l'accès, la rectification ou la
                  suppression de vos données personnelles que nous détenons.
                  Vous pouvez également demander la limitation ou la portabilité
                  de vos données personnelles, ainsi que vous opposer à leur
                  traitement. Pour exercer ces droits, veuillez nous contacter à
                  l'adresse e-mail ou au numéro de téléphone fourni ci-dessous.
                  {"\n"}
                </Text>
                <Text style={styles.CGVTitle}>
                  Modifications de la politique de confidentialité{"\n"}
                </Text>
                <Text style={styles.CGVText}>
                  Nous nous réservons le droit de modifier cette politique de
                  confidentialité à tout moment. Si des modifications
                  importantes sont apportées, nous vous informerons par e-mail
                  ou par une notification dans notre application.{"\n"}
                </Text>
                <Text style={styles.CGVTitle}>Nous contacter{"\n"}</Text>
                <Text style={styles.CGVText}>
                  Si vous avez des questions ou des préoccupations concernant
                  cette politique de confidentialité, ou si vous souhaitez
                  exercer vos droits, veuillez nous contacter à l'adresse e-mail
                  contact@rticket.com ou par téléphone au +33 6 12 34 56 78.
                  {"\n"}
                </Text>
              </View>
            </ScrollView>
            <View style={styles.CGVButtonContainer}>
              <TouchableOpacity
                style={styles.CGVButton}
                onPress={() => setModalConfidentialityVisible(false)}
              >
                <Text style={styles.CGVButtonText}>Retour</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>

        <Modal backdropOpacity={0.7} isVisible={modalVisible}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Voulez-vous annuler votre demande et retourner à l'accueil ?
            </Text>
            <View style={styles.modalButton}>
              <TouchableOpacity
                style={styles.modalButtons}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.navButtonText}>Non</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtons}>
                <Text style={styles.navButtonText} onPress={cancel}>
                  Oui
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal backdropOpacity={0.7} isVisible={modalVisibleValidation}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Confirmez-vous votre demande de table ?
            </Text>
            <View style={styles.modalButton}>
              <TouchableOpacity
                style={styles.modalButtonsValidation}
                onPress={() => setModalVisibleValidation(false)}
              >
                <Text style={styles.navButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonsValidation}>
                <Text
                  style={styles.navButtonText}
                  onPress={() => {
                    onSubmit(firstName, email, phoneNumber, resto);
                    setModalVisibleValidation(false);
                  }}
                >
                  Confirmer
                </Text>
              </TouchableOpacity>
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
                      onChangeText={onChangeFirstName}
                      value={firstName}
                      placeholder="Nom et prénom"
                    />
                  )}
                  name="firstName"
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={focus ? styles.inputFocus : styles.input}
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
                      onChangeText={onChangePhoneNumber}
                      value={phoneNumber}
                      placeholder="N° de téléphone"
                      keyboardType="phone-pad"
                    />
                  )}
                  name="phoneNumber"
                />
                {formErrors && (
                  <Text style={styles.errorText}>{formErrors}</Text>
                )}
                <Text style={styles.conditionsText}>
                  En cliquant sur "Valider", je reconnais avoir lu et accepté
                  les{" "}
                  <Text
                    style={styles.textUnderlined}
                    onPress={() => {
                      setModalCGVVisible(true);
                    }}
                  >
                    conditions générales d'utilisation
                  </Text>{" "}
                  et la{" "}
                  <Text
                    style={styles.textUnderlined}
                    onPress={() => {
                      setModalConfidentialityVisible(true);
                    }}
                  >
                    politique de confidentialité
                  </Text>{" "}
                  de R'Ticket.
                </Text>
                <View style={styles.formButton}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={styles.navButtonText}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => setModalVisibleValidation(true)}
                  >
                    <Text style={styles.navButtonText}>Valider</Text>
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
  text: { fontSize: 18, marginTop: 13, fontWeight: "bold" },
  greenText: {
    fontSize: 18,
    marginTop: 13,
    fontWeight: "bold",
    color: "#02C900",
  },
  textExpl: { fontSize: 18, marginTop: 13, fontWeight: "bold", paddingTop: 40 },
  textUnderlined: {
    textDecorationLine: "underline",
  },
  formContainer: {
    height: "75%",
    width: "45%",
    justifyContent: "center",
  },
  conditionsText: {
    fontSize: 16,
    marginTop: 13,
    fontWeight: "bold",
    textAlign: "justify",
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
  errorText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
  modalCGV: {
    width: "70%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 35,
    paddingBottom: 5,
    paddingLeft: 35,
    paddingRight: 35,
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
  CGVScrollView: {
    width: "100%",
    height: "80%",
  },
  CGVBigTitle: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
  },
  CGVTitle: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  CGVText: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 30,
  },
  CGVButtonContainer: {
    height: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 5,
  },
  CGVButton: {
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

  CGVButtonText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#424242",
  },
});
