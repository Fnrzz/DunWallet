"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, SignInIcon, WalletIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 py-10">
      <h6 className="text-sm font-bold flex items-center gap-2">
        <WalletIcon size={20} /> Dun Wallet
      </h6>
      <div className="w-4/5">
        <h3 className="text-2xl font-bold text-center">
          Dun Crypto Wallet App
        </h3>
      </div>
      <Image
        loading="eager"
        src="/home.avif"
        width={500}
        height={500}
        alt="home"
        className="w-full"
      />
      <div className="w-full flex flex-col gap-3">
        <Button
          variant="outline"
          className="w-full justify-start py-8 px-6 rounded-full"
        >
          <Link href="/register" className="flex items-center gap-2 w-full">
            <div className="flex items-center justify-center bg-[#d0f500] w-7 h-7 rounded-sm border-2 border-black">
              <PlusIcon size={20} weight="bold" />
            </div>
            <div className="flex flex-col items-start">
              <h6 className="font-bold">Create</h6>
              <p className="text-xs text-muted-foreground">new account</p>
            </div>
          </Link>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start py-8 px-6 rounded-full"
        >
          <Link href="/login" className="flex items-center gap-2 w-full">
            <div className="flex items-center justify-center bg-[#fe4183] w-7 h-7 rounded-sm border-2 border-black">
              <SignInIcon size={20} weight="bold" />
            </div>
            <div className="flex flex-col items-start">
              <h6 className="font-bold">Sign in</h6>
              <p className="text-xs text-muted-foreground">existing account</p>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
