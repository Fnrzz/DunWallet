"use client";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/src/components/ui/drawer";
import { CaretRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";

interface VerifyOtpDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VerifyOtpDrawer = ({ open, onOpenChange }: VerifyOtpDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-4" aria-describedby="drawer-desc">
        <DrawerTitle className="sr-only">Verification Complete</DrawerTitle>
        <DrawerDescription id="drawer-desc" className="sr-only">
          Your email has been verified successfully.
        </DrawerDescription>
        <div className="w-full flex flex-col pt-5 items-center">
          <Image
            src="/successverify.avif"
            alt="verification"
            width={500}
            height={500}
            loading="eager"
            className="w-full h-fit object-cover"
          />
          <h1 className="text-lg font-black tracking-tight mt-4 mb-10">
            Email Verification Complete
          </h1>
        </div>
        <DrawerFooter>
          <Link
            href="/"
            className="w-full py-4 text-md flex items-center bg-black rounded-full text-white justify-center gap-2"
          >
            Go To Home Screen <CaretRightIcon />
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default VerifyOtpDrawer;
