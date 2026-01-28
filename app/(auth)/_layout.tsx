import { useAuth } from "@/components/authContext";
import { Redirect, Slot } from "expo-router";

export default function AuthLayout() {
  const { user } = useAuth();

  console.log(user);

  if (user) {
    return <Redirect href={"/(app)/(tabs)/home"} />;
  }
  return <Slot />;
}
