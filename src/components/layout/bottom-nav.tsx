"use client";

import {
  WalletIcon,
  GlobeIcon,
  ArrowsLeftRightIcon,
  UserIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="sticky bottom-6 w-full z-50 mt-auto">
      <nav className="bg-[#2a0cf6] rounded-full py-5 px-8 flex justify-between items-center text-white">
        <Link
          href="/"
          className={`hover:scale-110 transition-transform ${isActive("/") ? "text-white" : "text-white/50"}`}
        >
          <WalletIcon size={28} weight={isActive("/") ? "bold" : "regular"} />
        </Link>
        <Link
          href="/browse"
          className={`hover:scale-110 transition-transform ${isActive("/browse") ? "text-white" : "text-white/50"}`}
        >
          <GlobeIcon
            size={28}
            weight={isActive("/browse") ? "bold" : "regular"}
          />
        </Link>
        <Link
          href="/transactions"
          className={`hover:scale-110 transition-transform ${isActive("/transactions") ? "text-white" : "text-white/50"}`}
        >
          <ArrowsLeftRightIcon
            size={28}
            weight={isActive("/transactions") ? "bold" : "regular"}
          />
        </Link>
        <Link
          href="/profile"
          className={`hover:scale-110 transition-transform ${isActive("/profile") ? "text-white" : "text-white/50"}`}
        >
          <UserIcon
            size={28}
            weight={isActive("/profile") ? "bold" : "regular"}
          />
        </Link>
      </nav>
    </div>
  );
}
