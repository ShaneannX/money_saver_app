import { Button } from "@react-navigation/elements";
// import { Button } from "react-native";
import { useAuth } from "@/components/authContext";
import { StyleSheet, View } from "react-native";
export default function Settings({}) {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      console.log("LOGGING OUT");
      await signOut();
    } catch (err: any) {
      console.log("Login Error:", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button style={styles.button} onPressIn={handleSignOut}>
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 20,
    backgroundColor: "#57575750",
    color: "#ffffff",
  },
});
