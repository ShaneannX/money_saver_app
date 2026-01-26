import { Button } from "@react-navigation/elements";
// import { Button } from "react-native";
import { StyleSheet, View } from "react-native";

export default function Settings({}) {
 
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
      >
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
    backgroundColor: "#fff",
    color: "#fff",
  },
});
