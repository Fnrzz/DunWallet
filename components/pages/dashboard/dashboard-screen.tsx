"use client";
import { BottomNav } from "@/components/ui/bottom-nav";
import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react";
import CardDashboard from "./card-dashboard";
import Image from "next/image";

const DashboardScreen = () => {
  return (
    <div className="w-full flex flex-col pt-8 gap-6 min-h-screen text-black font-sans">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tight">Dun Wallet</h1>
        <div className="flex gap-3">
          <button className="text-black hover:scale-110 transition-transform relative">
            <MagnifyingGlassIcon size={24} weight="regular" />
          </button>
          <button className="text-black hover:scale-110 transition-transform relative">
            <PlusIcon size={24} weight="regular" />
          </button>
        </div>
      </header>
      <div className="w-full flex justify-center relative">
        <Image
          src="/iconbtc.avif"
          alt="iconbtc"
          width={100}
          height={100}
          className="w-20 h-20 absolute -left-12 top-3 -rotate-45"
        />
        <CardDashboard />
      </div>
      <BottomNav />
    </div>
  );
};

export default DashboardScreen;
