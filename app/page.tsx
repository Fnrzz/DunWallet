"use client";
import WelcomeScreen from "@/components/pages/home/welcome-screen";
import DashboardScreen from "@/components/pages/dashboard/dashboard-screen";
import { useUser } from "@/hooks/useUser";
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
