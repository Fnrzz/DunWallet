"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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
