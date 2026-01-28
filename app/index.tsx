import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Money Saver</Text>
      <Text style={styles.subtitle}>Let’s get you started</Text>

      <Link href="/login" asChild>
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonText}>Existing user?</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/register" asChild>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>New user?</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 40,
  },
  buttonPrimary: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#00f020",
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonSecondary: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
