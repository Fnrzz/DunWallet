"use client";

import FormLogin from "@/components/pages/login/form-login";
import { WalletIcon } from "@phosphor-icons/react";

const page = () => {
  return (
    <div className="flex flex-col items-center min-h-screen gap-10 py-10">
      <h6 className="text-sm font-bold flex items-center gap-2">
        <WalletIcon size={20} /> Dun Wallet
      </h6>
      <div className="w-full text-center">
        <h1 className="text-3xl font-black tracking-tight mb-2">
          Welcome Back!
        </h1>
        <p className="text-gray-500 text-sm">Sign in to your account</p>
      </div>
      <FormLogin />
    </div>
  );
};

export default page;
