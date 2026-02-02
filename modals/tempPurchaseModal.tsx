// import { Form, Host, TextField } from "@expo/ui/swift-ui";
import React from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";

export default function TempPurchaseModal({ open, setOpen }) {
  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>This is a temp purchase modal</Text>
          <Button title="Close" onPress={() => setOpen(false)} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: { fontSize: 18, marginBottom: 10 },
});
