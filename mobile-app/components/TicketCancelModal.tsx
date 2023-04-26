import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TicketCancelModal = ({
  closeButtonAction,
  ticketCancelAction,
}: {
  closeButtonAction: () => void;
  ticketCancelAction: () => void;
}) => {
  return (
    <>
      <View style={styles.ticketCancelModalContainer}>
        <Text style={styles.ticketCancelModalText}>
          Voulez-vous annuler votre demande et retourner à l'accueil ?
        </Text>
        <View style={styles.ticketCancelModalButtonContainer}>
          <TouchableOpacity
            style={styles.ticketCancelModalButton}
            onPress={closeButtonAction}
          >
            <Text style={styles.ticketCancelModalButtonText}>Non</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ticketCancelModalButton}>
            <Text
              style={styles.ticketCancelModalButtonText}
              onPress={ticketCancelAction}
            >
              Oui
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TicketCancelModal;

const styles = StyleSheet.create({
  ticketCancelModalContainer: {
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
  ticketCancelModalText: {
    fontSize: 28,
    alignSelf: "center",
    textAlign: "center",
  },
  ticketCancelModalButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 50,
  },
  ticketCancelModalButtonText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#424242",
  },
  ticketCancelModalButton: {
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
