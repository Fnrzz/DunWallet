"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        display_name: data.name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (
    authData?.user &&
    authData.user.identities &&
    authData.user.identities.length === 0
  ) {
    return { error: "Email is already registered" };
  }

  redirect(`/verify-otp?email=${encodeURIComponent(data.email)}`);
}
