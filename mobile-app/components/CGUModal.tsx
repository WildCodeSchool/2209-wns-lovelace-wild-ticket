import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CGUModal = ({ closeButtonAction }: { closeButtonAction: () => void }) => {
  return (
    <>
      <SafeAreaView style={styles.modalCGU}>
        <ScrollView style={styles.CGUScrollView}>
          <View>
            <Text style={styles.CGUBigTitle}>
              Conditions Générales d'Utilisation de R'Ticket{"\n"}
            </Text>
            <Text style={styles.CGUText}>
              En utilisant l'application R'Ticket pour générer des tickets de
              file d'attente dans les restaurants, vous acceptez les présentes
              Conditions Générales d'Utilisation (CGU). Veuillez lire
              attentivement les CGU avant d'utiliser l'application. Si vous
              n'acceptez pas les CGU, veuillez ne pas utiliser l'application.
              {"\n"}
            </Text>
            <Text style={styles.CGUTitle}>
              Utilisation de l'application{"\n"}
            </Text>
            <Text style={styles.CGUText}>
              L'application R'Ticket est destinée à être utilisée pour générer
              des tickets de file d'attente dans les restaurants. Vous devez
              fournir votre adresse e-mail ou votre numéro de téléphone pour
              recevoir votre ticket de file d'attente. Vous êtes responsable de
              l'exactitude de toutes les informations que vous fournissez lors
              de l'utilisation de l'application. Vous ne pouvez pas utiliser
              l'application à des fins illégales ou pour perturber le
              fonctionnement de l'application ou de tout autre service connexe.
              {"\n"}
            </Text>
            <Text style={styles.CGUTitle}>Propriété intellectuelle{"\n"}</Text>
            <Text style={styles.CGUText}>
              L'application R'Ticket et tout son contenu, y compris les textes,
              les graphiques, les logos, les images et les logiciels, sont la
              propriété de R'Ticket et sont protégés par les lois françaises et
              internationales sur les droits d'auteur, les marques déposées et
              les autres lois sur la propriété intellectuelle. Vous ne pouvez
              pas utiliser ou reproduire le contenu de l'application sans
              l'autorisation écrite préalable de R'Ticket.{"\n"}
            </Text>
            <Text style={styles.CGUTitle}>Responsabilité{"\n"}</Text>
            <Text style={styles.CGUText}>
              R'Ticket n'est pas responsable des retards, des pertes ou des
              dommages causés par l'utilisation de l'application. R'Ticket ne
              garantit pas l'exactitude ou l'exhaustivité des informations
              fournies par l'application. R'Ticket ne garantit pas que
              l'application sera disponible en tout temps ou qu'elle
              fonctionnera sans interruption ou sans erreur. Vous utilisez
              l'application à vos propres risques.{"\n"}
            </Text>
            <Text style={styles.CGUTitle}>Confidentialité{"\n"}</Text>
            <Text style={styles.CGUText}>
              R'Ticket est soucieux de la protection de votre vie privée. Nous
              ne divulguerons pas votre adresse e-mail ou votre numéro de
              téléphone en dehors du circuit de l'application. Veuillez lire
              notre Politique de Confidentialité pour plus d'informations sur la
              collecte, l'utilisation et la divulgation de vos données
              personnelles.{"\n"}
            </Text>
            <Text style={styles.CGUTitle}>Modification des CGU{"\n"}</Text>
            <Text style={styles.CGUText}>
              R'Ticket se réserve le droit de modifier les CGU à tout moment.
              Nous vous encourageons à consulter régulièrement les CGU pour vous
              assurer que vous êtes toujours d'accord avec leur contenu.{"\n"}
            </Text>
            <Text style={styles.CGUTitle}>
              Loi applicable et juridiction compétente{"\n"}
            </Text>
            <Text style={styles.CGUText}>
              Les présentes CGU sont régies par la loi française. Tout litige
              découlant de l'utilisation de l'application sera soumis à la
              juridiction exclusive des tribunaux français.{"\n"}
            </Text>
            <Text style={styles.CGUTitle}>Nous contacter{"\n"}</Text>
            <Text style={styles.CGUText}>
              Si vous avez des questions ou des préoccupations concernant les
              présentes CGU, veuillez nous contacter à l'adresse e-mail
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

export default CGUModal;

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
