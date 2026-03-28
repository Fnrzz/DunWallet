"use client";
import WelcomeScreen from "@/src/components/features/home/welcome-screen";
import DashboardScreen from "@/src/components/features/dashboard/DashboardScreen";
import { useUser } from "@/src/hooks/useUser";
import Loading from "./loading";

export default function Home() {
  const { user, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <DashboardScreen />;
  }

  return <WelcomeScreen />;
}
