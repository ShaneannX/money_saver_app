import { Slot } from "expo-router";
import { AuthProvider } from "../components/authContext";

export default function App() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
