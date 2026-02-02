import { loadCache, saveCache } from "@/utils/offlineClient";
import { supabase } from "@/utils/supabase";

export const AddIncomeOrBills = async (
  user_id: string,
  tableName: string,
  name: string,
  pay_date: Date,
  amount: number,
) => {
  const { data, error } = await supabase
    .from(tableName)
    .insert([
      {
        user_id,
        name,
        pay_date,
        amount,
      },
    ])
    .eq("user_id", user_id);

  if (error) {
    console.log("Supabase insert error:", error);
    return null;
  }

  return data;
};

export const SelectAllIncomeOrBills = async (
  user_id: string,
  tableName: string,
) => {
  const cacheKey = tableName;
  const { data, error } = await supabase
    .from(tableName)
    .select("id,name,pay_date,amount")
    .eq("user_id", user_id);
  if (error) {
    console.log("Supabase select error:", error);
    const cached = await loadCache(cacheKey);
    return cached;
  }
  await saveCache(cacheKey, data);
  return data;
};

export const UpdateIncomeOrBills = async (
  user_id: string,
  tableName: string,
  id: string,
  fields: {
    name?: string;
    pay_date?: Date;
    amount?: number;
  },
) => {
  const { error, data } = await supabase
    .from(tableName)
    .update(fields)
    .eq("user_id", user_id)
    .eq("id", id);

  if (error) {
    console.log("Supabase Update Error: ", error);
    return null;
  }

  return data;
};

export const DeleteIncomeOrBills = async (
  user_id: string,
  tableName: string,
  id: string,
) => {
  const { error, data } = await supabase
    .from(tableName)
    .delete()
    .eq("id", id)
    .eq("user_id", user_id);

  if (error) {
    console.log("Supabase Delete Error: ", error);
    return null;
  }

  return data;
};
