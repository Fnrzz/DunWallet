"use client";
import VerifyOtp from "@/src/components/features/auth/VerifyOtp";
import { WalletIcon } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  return (
    <div className="flex flex-col items-center min-h-screen gap-10 py-10 px-4 font-sans text-black overflow-hidden">
      <h6 className="text-sm font-bold flex items-center gap-2">
        <WalletIcon size={20} /> Dun Wallet
      </h6>
      <div className="w-full text-center max-w-sm">
        <h1 className="text-3xl font-black tracking-tight mb-2">
          Verify Email
        </h1>
        <p className="text-gray-500 text-sm">
          We sent a 6-digit code to{" "}
          <span className="font-bold text-black">{email}</span>. Please enter it
          below.
        </p>
      </div>
      <VerifyOtp email={email} />
    </div>
  );
};

export default page;
