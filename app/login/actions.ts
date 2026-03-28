"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

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
