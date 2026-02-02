import { useAuth } from "@/components/authContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, []);

  const handleLogin = async () => {
    try {
      await signUp(email, password);

      setEmail("");
      setPassword("");
      setUsername("");
    } catch (err: any) {
      return Alert.alert(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Below:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email here"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password here"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonWrapper}>
        <Button title="Register" onPress={handleLogin} color="#4CAF50" />
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
