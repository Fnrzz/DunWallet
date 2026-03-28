"use client";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";

const CardDashboard = () => {
  const { user, loading } = useUser();

  return (
    <div className="w-full h-[200px] flex flex-col border-1 border-black rounded-2xl overflow-hidden">
      <div className="w-full h-[40%] flex border-b-1 border-black bg-white/10 backdrop-blur-xs overflow-hidden relative">
        <div className="w-full h-full flex flex-col justify-center pl-8">
          <h6 className="text-xs">Hey,</h6>
          <h3 className="text-sm">
            {loading
              ? "Loading..."
              : user?.user_metadata?.display_name || "User"}
          </h3>
        </div>
        <div className="absolute -right-16 -top-11 w-40 h-40 bg-[#ba8fff] -rotate-25 border-l-1 border-black"></div>
      </div>
      <div className="w-full h-[60%] bg-[#d0f500] flex overflow-hidden relative">
        <div className="w-full h-full flex items-end pl-8 pb-3">
          <div className="flex items-center gap-2">
            <Image
              src="/iconcircle.avif"
              alt="iconcircle"
              width={100}
              height={100}
              className="w-10 h-fit"
            />
            <div className="flex flex-col">
              <h6 className="text-xs">Total Balance</h6>
              <h3 className="text-lg font-bold">3,000.00 USD</h3>
            </div>
          </div>
        </div>
        <div className="absolute -right-25 -top-11 w-40 h-40 bg-black -rotate-25"></div>
        <div className="absolute top-5 right-10">
          <Image
            src="/iconchip.avif"
            alt="iconchip"
            width={100}
            height={100}
            className="w-14 h-10 object-cover rounded-lg bg-gradient-to-br from-white to-[#ba8fff] border-1 border-black "
          />
        </div>
      </div>
    </div>
  );
};

export default CardDashboard;
