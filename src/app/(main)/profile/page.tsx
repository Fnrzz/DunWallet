"use client";
import { BottomNav } from "@/src/components/layout/bottom-nav";
import { useUser } from "@/src/hooks/useUser";
import Image from "next/image";
import { logout } from "@/src/lib/actions/auth";
import { Button } from "@/src/components/ui/button";
import { SignOutIcon } from "@phosphor-icons/react";

const page = () => {
  const { user, loading } = useUser();
  return (
    <div className="w-full flex flex-col pt-8 gap-6 min-h-screen text-black font-sans">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tight">Account</h1>
      </header>
      <div className="w-full flex items-center gap-4">
        <Image
          src="/avatar.png"
          alt="avatar"
          width={100}
          height={100}
          className="w-20 h-20 object-cover rounded-full border-2 border-black bg-emerald-300"
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-black tracking-tight">
            {loading
              ? "Loading..."
              : user?.user_metadata?.display_name || "User"}
          </h2>
          <p className="text-xs text-gray-500">
            {loading ? "Loading..." : user?.email || "User"}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <Button
          onClick={() => logout()}
          className="w-full bg-red-500 hover:bg-red-400 text-white font-black py-4 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          <SignOutIcon size={24} weight="bold" />
          LOGOUT
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default page;
