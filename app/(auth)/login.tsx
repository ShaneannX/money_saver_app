import { useAuth } from "@/components/authContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err: any) {
      if (err?.message?.includes("Invalid login credentials")) {
        Alert.alert(
          "Invalid credentials",
          "Please check your email and password",
        );
        return;
      }

      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonWrapper}>
        <Button title="Login" onPress={handleLogin} color="#4CAF50" />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Return to main menu"
          onPress={() => router.replace("/")}
          color="#777777"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 30,
  },

  input: {
    width: "100%",
    backgroundColor: "#333",
    padding: 14,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#444",
  },

  buttonWrapper: {
    width: "100%",
    marginTop: 10,
  },
});
