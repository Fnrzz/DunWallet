"use client";
import { ListDashesIcon } from "@phosphor-icons/react";
import { BottomNav } from "@/src/components/layout/bottom-nav";
import CarouselBrowse from "@/src/components/features/browse/CarouselBrowse";

const page = () => {
  return (
    <div className="w-full flex flex-col pt-8 gap-6 min-h-screen text-black font-sans">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tight">Discover</h1>
        <button className="text-black hover:scale-110 transition-transform relative">
          <ListDashesIcon size={24} weight="regular" />
        </button>
      </header>
      <CarouselBrowse />
      <BottomNav />
    </div>
  );
};

export default page;
