import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
// define type due to typescript.
type Bill = {
  id: number;
};

export default function Home() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [error, setError] = useState<string | null>(null);
  // useEffect to run on load.
  useEffect(() => {
    // Async function due to fetching database bills table using supaBase API with database queries.
    async function loadBills() {
      const { data, error } = await supabase
        .from<"bills", Bill>("bills")
        .select("*");

      if (error) {
        setError(error.message);
        return;
      }
      // If data is valid then assingn data to bills const.
      if (data) {
        setBills(data);
      }
    }

    loadBills();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Screen!</Text>
      {error && <Text>Error: {error}</Text>}
      {/* returns length of amount of bills as a test. */}
      <Text>Bills count: {bills.length}</Text>
    </View>
  );
}
