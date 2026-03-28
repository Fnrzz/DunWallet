"use client";

import { login } from "@/src/lib/actions/auth";
import { loginSchema, type LoginFormValues } from "@/src/lib/validations/auth";
import { Button } from "@/src/components/ui/button";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
} from "@/src/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/src/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretRightIcon, CheckCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "sonner";

const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: LoginFormValues) => {
    startTransition(async () => {
      const result = await login({
        email: data.email,
        password: data.password,
      });
      if (result?.error) {
        toast.error(result.error, { position: "top-center" });
      }
    });
  };

  return (
    <form
      className="w-full flex flex-col justify-between gap-10 flex-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldSet className="w-full flex flex-col justify-start">
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <InputGroup className="p-7 rounded-full bg-white border border-gray-200">
              <InputGroupInput
                type="email"
                {...register("email")}
                className="bg-transparent"
                placeholder="you@example.com"
              />
              {dirtyFields.email && !errors.email && (
                <InputGroupAddon align="inline-end">
                  <CheckCircleIcon
                    size={24}
                    weight="fill"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d0f600]"
                  />
                </InputGroupAddon>
              )}
            </InputGroup>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <InputGroup className="p-7 rounded-full bg-white border border-gray-200">
              <InputGroupInput
                type="password"
                {...register("password")}
                className="bg-transparent"
                placeholder="********"
              />
              {dirtyFields.password && !errors.password && (
                <InputGroupAddon align="inline-end">
                  <CheckCircleIcon
                    size={24}
                    weight="fill"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d0f600]"
                  />
                </InputGroupAddon>
              )}
            </InputGroup>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>

      <div className="flex flex-col gap-4 mt-auto">
        <Button
          type="submit"
          className="w-full rounded-full p-7 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-transform border border-black"
          disabled={!isValid || isPending}
        >
          {isPending ? (
            "Signing in..."
          ) : (
            <>
              Sign In <CaretRightIcon size={20} weight="bold" />
            </>
          )}
        </Button>
      </div>
      <div className="mt-4 flex justify-center">
        <span className="text-xs text-muted-foreground mr-1">
          Don&apos;t have an account?{" "}
        </span>
        <Link href="/register" className="text-xs font-bold text-[#b181fe]">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default FormLogin;
