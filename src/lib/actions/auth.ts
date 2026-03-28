"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/src/lib/supabase/server";

export async function login(data: { email: string; password: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (error.message.toLowerCase().includes("email not confirmed")) {
      await supabase.auth.resend({
        type: "signup",
        email: data.email,
      });
      redirect(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    }
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

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

export async function verifyOtp(data: { email: string; token: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email: data.email,
    token: data.token,
    type: "signup",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
