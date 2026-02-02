import {
  DeleteIncomeOrBills,
  SelectAllIncomeOrBills,
} from "@/backend/sql_queries/IncomeAndBillsTable";
import { useAuth } from "@/components/authContext";
import UpdateMondals from "@/modals/updateModal";
import React, { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type IncomeAndBillRow = {
  id: string;
  name: string;
  pay_date: string;
  amount: number;
};

export default function IncomeAndBillTable() {
  const { user } = useAuth();
  const incomeTableName = "income";
  const billTableName = "bills";

  const [title, setTitle] = useState("");
  const [incomeTable, setIncomeTable] = useState<IncomeAndBillRow[]>([]);
  const [billTable, setBillTable] = useState<IncomeAndBillRow[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [update, setUpdate] = useState(false);
  const [rowId, setRowId] = useState("");
  const [open, setOpen] = useState(false);
  const [showRefresh, setShowRefresh] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showIncome, setShowIncome] = useState<boolean | false>(false);
  const [showBills, setShowBills] = useState<boolean | false>(false);

  const handleDelete = async (id: string, tableName: string) => {
    await DeleteIncomeOrBills(user.id, tableName, id);
    setIsUpdated(true);
  };

  const handleUpdate = (id: string) => {
    setRowId(id);
    setUpdate(true);
    setOpen(true);
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    const loadIncome = async () => {
      const cacheKey = showIncome ? "income_cache" : "bills_cache";
      const tableName = showIncome ? incomeTableName : billTableName;

      try {
        const result = await SelectAllIncomeOrBills(user.id, tableName);

        if (showIncome) setIncomeTable(result);
        else setBillTable(result);
      } catch (err) {
        console.log("Error getting data: ", err);
      }

      setIsUpdated(false);
    };

    if (user?.id) loadIncome();
  }, [user?.id, showIncome, showBills, isUpdated, update, refresh]);

  return (
    <ScrollView contentContainerStyle={{ padding: 0, alignItems: "center" }}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, showIncome && styles.toggleButtonActive]}
          onPress={() => {
            setShowIncome(true);
            setShowBills(false);
            setShowRefresh(true);
          }}
        >
          <Text
            style={[styles.toggleText, showIncome && styles.toggleTextActive]}
          >
            Income
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, showBills && styles.toggleButtonActive]}
          onPress={() => {
            setShowIncome(false);
            setShowBills(true);
            setShowRefresh(true);
          }}
        >
          <Text
            style={[styles.toggleText, showBills && styles.toggleTextActive]}
          >
            Bills
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bills Table */}
      {showBills &&
        (billTable ?? []).map((item, index) => (
          <View key={index} style={styles.rowContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.rowText}>Name: {item.name}</Text>
              <Text style={styles.rowText}>
                Pay Date: {new Date(item.pay_date).toLocaleDateString("en-GB")}
              </Text>
              <Text style={styles.rowText}>Amount: £{item.amount}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDelete(item.id, "bills")}
              >
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.updateButton]}
                onPress={() => handleUpdate(item.id)}
              >
                <Text style={styles.actionText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

      {/* Income Table */}
      {showIncome &&
        (incomeTable ?? []).map((item, index) => (
          <View key={index} style={styles.rowContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.rowText}>Name: {item.name}</Text>
              <Text style={styles.rowText}>
                Pay Date: {new Date(item.pay_date).toLocaleDateString("en-GB")}
              </Text>
              <Text style={styles.rowText}>Amount: £{item.amount}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDelete(item.id, "income")}
              >
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.updateButton]}
                onPress={() => handleUpdate(item.id)}
              >
                <Text style={styles.actionText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

      {update && (
        <UpdateMondals
          tableName={showIncome ? incomeTableName : billTableName}
          open={open}
          setOpen={setOpen}
          setUpdate={setUpdate}
          rowId={rowId}
        />
      )}

      {showRefresh ? (
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#a5a5a5",
    borderRadius: 10,
    padding: 4,
    marginVertical: 10,
    width: "90%",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#4A90E2",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  toggleTextActive: {
    color: "white",
  },
  rowContainer: {
    width: "100%",
    paddingVertical: 8,
    borderBottomWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#ccc",
    alignItems: "center",
  },
  rowText: {
    paddingRight: 5,
    width: "auto",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  deleteButton: {
    backgroundColor: "#b40202c2",
  },
  updateButton: {
    backgroundColor: "#2a80b9",
  },
  actionText: {
    color: "white",
    fontWeight: "600",
  },
  refreshButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    width: 100,
    alignItems: "center",
  },
  refreshText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
});
