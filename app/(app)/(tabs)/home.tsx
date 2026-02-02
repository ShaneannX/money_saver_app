import {
  AddIncomeAndOutgoings,
  GetRemainingBalance,
} from "@/backend/sql_queries/IncomeAndOutgoingsTable";
import { useAuth } from "@/components/authContext";
import BillsMondals from "@/modals/billsModals";
import IncomeMondals from "@/modals/incomeModals";
import TempPurchaseModal from "@/modals/tempPurchaseModal";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const [remainingBalance, setRemainingBalance] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isIncome, setIsIncome] = useState(false);
  const [isBills, setIsBills] = useState(false);
  const [isTempPurchase, setIsTempPurchase] = useState(false);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadBills = async () => {
      await AddIncomeAndOutgoings(user.id);
      const balance = await GetRemainingBalance(user.id);
      setRemainingBalance(balance);
    };

    loadBills();
  }, [refresh, open]);

  const handleRefresh = () => setRefresh(!refresh);

  const handleIncomeModal = () => {
    setIsIncome(true);
    setIsBills(false);
    setIsTempPurchase(false);
    setOpen(true);
  };

  const handleBillseModal = () => {
    setIsBills(true);
    setIsIncome(false);
    setIsTempPurchase(false);
    setOpen(true);
  };

  // const handleTempModal = () => {
  //   setIsTempPurchase(true);
  //   setIsBills(false);
  //   setIsIncome(false);
  //   setOpen(true);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME MONEY SAVER</Text>
      <View style={styles.balanceBox}>
        <Text style={styles.balanceLabel}>Remaining Balance</Text>
        <Text style={styles.balanceValue}>£{remainingBalance}</Text>
      </View>

      {error && <Text style={styles.error}>Error: {error}</Text>}

      {isIncome && <IncomeMondals open={open} setOpen={setOpen} />}
      {isBills && <BillsMondals open={open} setOpen={setOpen} />}
      {isTempPurchase && <TempPurchaseModal open={open} setOpen={setOpen} />}

      <TouchableOpacity style={styles.button} onPress={handleIncomeModal}>
        <Text style={styles.buttonText}>Add Income</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleBillseModal}>
        <Text style={styles.buttonText}>Add Bills</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button} onPress={handleTempModal}>
        <Text style={styles.buttonText}>Add Temp Purchase</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  balanceBox: {
    backgroundColor: "#000000",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "#3d4148",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#1d6cfd",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  balanceLabel: {
    fontSize: 16,
    color: "#c7c9cc",
    marginBottom: 6,
    textAlign: "center",
  },

  balanceValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#00f020",
    textAlign: "center",
  },

  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 6,
    width: 220,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  refreshButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    width: 220,
    alignItems: "center",
  },
  refreshText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
