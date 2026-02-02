import { loadCache, saveCache } from "@/utils/offlineClient";
import { supabase } from "@/utils/supabase";
const tableName = "income_and_outgoings";
const billTableName = "bills";
const incomeTableName = "income";

export const AddIncomeAndOutgoings = async (user_id: string) => {
  const { data: billsData, error: billsError } = await supabase
    .from(billTableName)
    .select("amount")
    .eq("user_id", user_id);

  if (billsError) {
    console.log("Supabase error: Unable to retrieve bills data:", billsError);
    const cache = loadCache(user_id);
    console.log(cache);
    return cache;
  }

  const totalBills = billsData.reduce((sum, row) => sum + row.amount, 0);

  const { data: incomeData, error: incomeError } = await supabase
    .from(incomeTableName)
    .select("amount")
    .eq("user_id", user_id);

  if (incomeError) {
    console.log("Supabase error: Unable to retrieve income data: ", billsError);
    const cache = loadCache(user_id);
    console.log(cache);
    return cache;
  }

  const totalIncome = incomeData.reduce((sum, row) => sum + row.amount, 0);

  const { data, error } = await supabase.from(tableName).upsert(
    {
      user_id: user_id,
      total_outgoings: totalBills,
      total_income: totalIncome,
    },
    { onConflict: "user_id" },
  );

  if (error) {
    console.log(
      "Supabase error: Unable to update total outgoings and total income: ",
      error,
    );
    const cache = loadCache(user_id);
    console.log(cache);
    return cache;
  }
  console.log(data);
  return data;
};

export const GetRemainingBalance = async (user_id: string) => {
  var remainingBalance = 0;
  try {
    const { data: totalOutgoings, error: totalOutgoingsError } = await supabase
      .from(tableName)
      .select("total_outgoings")
      .eq("user_id", user_id);

    if (totalOutgoingsError) {
      console.log(
        "Supabase error: Unable to get total bills: ",
        totalOutgoingsError,
      );
      const cache = loadCache(user_id);
      console.log(cache);
      return cache;
    }

    const { data: totalIncome, error: totalIncomeError } = await supabase
      .from(tableName)
      .select("total_income")
      .eq("user_id", user_id);

    if (totalIncomeError) {
      console.log(
        "Supabase error: Unable to get total income: ",
        totalIncomeError,
      );
      const cache = loadCache(user_id);
      console.log(cache);
      return cache;
    }

    const totalOugoingsSum =
      totalOutgoings?.reduce((sum, row) => sum + row.total_outgoings, 0) ?? 0;
    const totalIncomeSum =
      totalIncome?.reduce((sum, row) => sum + row.total_income, 0) ?? 0;

    remainingBalance = totalIncomeSum - totalOugoingsSum;
    console.log(remainingBalance);
    await saveCache(user_id, remainingBalance);
  } catch {
    const cache = loadCache(user_id);
    return cache;
  }
  return remainingBalance;
};
