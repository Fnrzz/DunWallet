"use client";

import FormRegister from "@/components/pages/register/form-register";
import { WalletIcon } from "@phosphor-icons/react";

const page = () => {
  return (
    <div className="flex flex-col items-center min-h-screen gap-10 py-10">
      <h6 className="text-sm font-bold flex items-center gap-2">
        <WalletIcon size={20} /> Dun Wallet
      </h6>
      <FormRegister />
    </div>
  );
};

export default page;
