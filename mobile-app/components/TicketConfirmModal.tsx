import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TicketConfirmModal = ({
  closeButtonAction,
  ticketConfirmAction,
}: {
  closeButtonAction: () => void;
  ticketConfirmAction: () => void;
}) => {
  return (
    <>
      <View style={styles.ticketConfirmModalContainer}>
        <Text style={styles.ticketConfirmModalText}>
          Confirmez-vous votre demande de table ?
        </Text>
        <View style={styles.ticketConfirmModalButtonContainer}>
          <TouchableOpacity
            style={styles.ticketConfirmModalButton}
            onPress={closeButtonAction}
          >
            <Text style={styles.ticketConfirmModalButtonText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ticketConfirmModalButton}>
            <Text
              style={styles.ticketConfirmModalButtonText}
              onPress={ticketConfirmAction}
            >
              Confirmer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TicketConfirmModal;

const styles = StyleSheet.create({
  ticketConfirmModalContainer: {
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
  ticketConfirmModalText: {
    fontSize: 28,
    alignSelf: "center",
    textAlign: "center",
  },
  ticketConfirmModalButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 50,
  },
  ticketConfirmModalButtonText: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#424242",
  },
  ticketConfirmModalButton: {
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
