import { signup } from "@/src/lib/actions/auth";
import { registerSchema, type RegisterFormValues } from "@/src/lib/validations/auth";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
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
import { Controller, useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "sonner";

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmation_password: "",
      terms: false,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: RegisterFormValues) => {
    startTransition(async () => {
      const result = await signup({
        name: data.name,
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
      className="w-full h-[80vh] flex flex-col justify-between gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldSet className="w-full h-full flex flex-col justify-between">
        <FieldGroup>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <InputGroup className="p-7 rounded-full">
              <InputGroupInput
                type="text"
                {...register("name")}
                className="bg-transparent"
              />
              {dirtyFields.name && !errors.name && (
                <InputGroupAddon align="inline-end">
                  <CheckCircleIcon
                    size={24}
                    weight="fill"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d0f600]"
                  />
                </InputGroupAddon>
              )}
            </InputGroup>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </Field>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <InputGroup className="p-7 rounded-full">
              <InputGroupInput
                type="email"
                {...register("email")}
                className="bg-transparent"
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
            <InputGroup className="p-7 rounded-full">
              <InputGroupInput
                type="password"
                {...register("password")}
                className="bg-transparent"
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
          <Field>
            <FieldLabel>Confirmation Password</FieldLabel>
            <InputGroup className="p-7 rounded-full">
              <InputGroupInput
                type="password"
                {...register("confirmation_password")}
                className="bg-transparent"
              />
              {dirtyFields.confirmation_password &&
                !errors.confirmation_password && (
                  <InputGroupAddon align="inline-end">
                    <CheckCircleIcon
                      size={24}
                      weight="fill"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d0f600]"
                    />
                  </InputGroupAddon>
                )}
            </InputGroup>
            {errors.confirmation_password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmation_password.message}
              </p>
            )}
          </Field>
        </FieldGroup>
        <Field orientation="horizontal">
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className={`w-6 h-6 rounded-full aria-checked:bg-[#d0f600] aria-checked:text-black ${errors.terms ? "border-red-500" : ""}`}
              />
            )}
          />
          <p className="text-[11px]">
            I have agreed to the{" "}
            <Link href="/terms" className="text-[#ff478a]">
              Terms and Conditions
            </Link>
          </p>
        </Field>
      </FieldSet>
      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          className="w-full rounded-full p-7"
          disabled={!isValid || isPending}
        >
          {isPending ? (
            "Signing up..."
          ) : (
            <>
              Sign Up <CaretRightIcon size={20} weight="bold" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default FormRegister;
