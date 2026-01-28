import { useAuth } from "@/components/authContext";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { session, loading } = useAuth();

  if (loading) return null;

  if (!session) {
    return <Redirect href="/" />; // Default is the landing page
  }

  return <Stack />;
}
