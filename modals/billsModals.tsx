// import { Form, Host, TextField } from "@expo/ui/swift-ui";
import { AddIncomeOrBills } from "@/backend/sql_queries/IncomeAndBillsTable";
import { useAuth } from "@/components/authContext";
import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
export default function IncomeMondals({ open, setOpen }) {
  const tableName = "bills";
  const [name, setName] = useState<string | "">("");
  const [pay_date, setPayDate] = useState<string | "">("");
  const [amount, setAmount] = useState<number | 0>(0);
  const [data, setData] = useState<any | null>(null);

  const { user } = useAuth();
  const handleSubmit = async () => {
    const parsedDate = pay_date ? new Date(pay_date) : new Date();

    setData(
      await AddIncomeOrBills(user.id, tableName, name, parsedDate, amount),
    );
    setName("");
    setPayDate("");
    setAmount(0);
    console.log(data);
    return;
  };
  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Add your Income below</Text>
          <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter Bill Name"
            />

            <Text style={styles.label}>Due Date</Text>
            <TextInput
              style={styles.input}
              value={pay_date}
              onChangeText={setPayDate}
              placeholder="YYYY-MM-DD"
              autoCapitalize="none"
            />
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              value={amount ? amount.toString() : ""}
              onChangeText={(text) => setAmount(text ? Number(text) : 0)}
              placeholder="Enter amount"
            />
            <Button title="Add Bill" onPress={handleSubmit} />
          </View>

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
  container: {
    padding: 20,
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
  },
  modalBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: { fontSize: 18, marginBottom: 10 },
});
