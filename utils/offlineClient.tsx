import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveCache = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.log("Error saving cache", err);
  }
};

export const loadCache = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.log("Error loading cache", err);
    return null;
  }
};
