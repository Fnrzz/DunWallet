"use client";
import { WalletIcon, CaretRightIcon, SpinnerIcon } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
import {
  useTransition,
  useState,
  useEffect,
  useCallback,
  Suspense,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOtpSchema, type VerifyOtpFormValues } from "@/src/lib/validations/auth";
import { toast } from "sonner";
import { verifyOtp } from "@/src/lib/actions/auth";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/src/components/ui/drawer";
import Link from "next/link";
import Image from "next/image";

const VerifyOtpContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [isPending, startTransition] = useTransition();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    mode: "onChange",
    defaultValues: {
      token: "",
    },
  });

  const tokenValue = watch("token");

  const handleVerify = useCallback(
    (token: string) => {
      startTransition(async () => {
        const result = await verifyOtp({ email, token });
        if (result?.error) {
          toast.error(result.error, { position: "top-center" });
          reset();
        } else if (result?.success) {
          setDrawerOpen(true);
          reset();
        }
      });
    },
    [email, reset],
  );

  useEffect(() => {
    if (
      tokenValue &&
      tokenValue.length === 6 &&
      /^[0-9]+$/.test(tokenValue) &&
      !isPending
    ) {
      handleVerify(tokenValue);
    }
  }, [tokenValue, handleVerify, isPending]);

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

      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold">Verification Code</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              disabled={isPending}
              {...register("token")}
              className={`w-full p-4 text-center text-2xl tracking-[0.5em] font-black rounded-xl border-2 border-black bg-white shadow-[4px_4px_0px_#000] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all placeholder:text-gray-300 ${errors.token ? "border-red-500" : ""} ${isPending ? "opacity-50" : ""}`}
            />
            {isPending && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-xl">
                <svg
                  className="animate-spin h-8 w-8 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              </div>
            )}
          </div>
          {errors.token && (
            <p className="text-xs text-red-500 font-bold">
              {errors.token.message}
            </p>
          )}
          {isPending && (
            <p className="text-xs text-gray-500 font-bold text-center animate-pulse">
              Verifying...
            </p>
          )}
        </div>
      </div>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
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
    </div>
  );
};

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-bold">
          Loading...
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
};

export default page;
