import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CPModal = ({ closeButtonAction }: { closeButtonAction: () => void }) => {
  return (
    <>
      <SafeAreaView style={styles.modalCGU}>
        <ScrollView style={styles.CGUScrollView}>
          <View>
            <Text style={styles.CGUBigTitle}>
              Politique de confidentialité de R'Ticket{"\n"}
            </Text>
            <Text style={styles.CGUText}>
              Chez R'Ticket, nous nous engageons à protéger la confidentialité
              de vos données personnelles. Cette politique de confidentialité
              décrit comment nous collectons, utilisons et partageons vos
              informations lorsque vous utilisez notre application pour générer
              des tickets de file d'attente dans les restaurants.
              {"\n"}
            </Text>
            <Text style={styles.CGUTitle}>
              Collecte de données personnelles{"\n"}
            </Text>
            <Text style={styles.CGUText}>
              Lorsque vous utilisez notre application, nous collectons votre
              adresse e-mail ou votre numéro de téléphone portable. Nous ne
              collectons pas d'autres données personnelles vous concernant. Nous
              utilisons ces informations pour vous envoyer votre ticket de file
              d'attente et pour vous envoyer des mises à jour sur votre position
              dans la file d'attente, si vous avez choisi de les recevoir.{"\n"}
            </Text>
            <Text style={styles.CGUTitle}>
              Utilisation des données personnelles{"\n"}
            </Text>
            <Text style={styles.CGUText}>
              Nous utilisons vos données personnelles uniquement pour vous
              fournir les services que vous avez demandés. Nous ne vendrons pas
              vos données personnelles à des tiers ni ne les partagerons avec
              des tiers, sauf si cela est nécessaire pour vous fournir le
              service que vous avez demandé. Par exemple, nous pouvons partager
              vos données personnelles avec le restaurant que vous avez choisi
              afin qu'ils puissent suivre votre position dans la file d'attente.
              {"\n"}
            </Text>
            <Text style={styles.CGUTitle}>
              Sécurité des données personnelles{"\n"}
            </Text>
            <Text style={styles.CGUText}>
              Nous prenons des mesures techniques et organisationnelles
              appropriées pour protéger vos données personnelles contre tout
              accès, modification, divulgation ou destruction non autorisés.
              Nous ne conserverons vos données personnelles que pendant la durée
              nécessaire pour fournir les services que vous avez demandés.{"\n"}
            </Text>
            <Text style={styles.CGUTitle}>Vos droits{"\n"}</Text>
            <Text style={styles.CGUText}>
              Vous avez le droit de demander l'accès, la rectification ou la
              suppression de vos données personnelles que nous détenons. Vous
              pouvez également demander la limitation ou la portabilité de vos
              données personnelles, ainsi que vous opposer à leur traitement.
              Pour exercer ces droits, veuillez nous contacter à l'adresse
              e-mail ou au numéro de téléphone fourni ci-dessous.
              {"\n"}
            </Text>
            <Text style={styles.CGUTitle}>
              Modifications de la politique de confidentialité{"\n"}
            </Text>
            <Text style={styles.CGUText}>
              Nous nous réservons le droit de modifier cette politique de
              confidentialité à tout moment. Si des modifications importantes
              sont apportées, nous vous informerons par e-mail ou par une
              notification dans notre application.{"\n"}
            </Text>
            <Text style={styles.CGUTitle}>Nous contacter{"\n"}</Text>
            <Text style={styles.CGUText}>
              Si vous avez des questions ou des préoccupations concernant cette
              politique de confidentialité, ou si vous souhaitez exercer vos
              droits, veuillez nous contacter à l'adresse e-mail
              contact@rticket.com ou par téléphone au +33 6 12 34 56 78.
              {"\n"}
            </Text>
          </View>
        </ScrollView>
        <View style={styles.CGUButtonContainer}>
          <TouchableOpacity
            style={styles.CGUButton}
            onPress={closeButtonAction}
          >
            <Text style={styles.CGUButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CPModal;

const styles = StyleSheet.create({
  modalCGU: {
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
  CGUScrollView: {
    width: "100%",
    height: "80%",
  },
  CGUBigTitle: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
  },
  CGUTitle: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  CGUText: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 30,
  },
  CGUButtonContainer: {
    height: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 5,
  },
  CGUButton: {
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
  CGUButtonText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#424242",
  },
});
