import z from "zod";

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Register schema
export const registerSchema = z
  .object({
    name: z.string().min(1, "Nama wajib diisi"),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmation_password: z.string().min(1, "Konfirmasi password wajib diisi"),
    terms: z.boolean().refine((val) => val === true, {
      message: "Anda harus menyetujui syarat & ketentuan",
    }),
  })
  .refine((data) => data.password === data.confirmation_password, {
    message: "Password tidak cocok",
    path: ["confirmation_password"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

// Verify OTP schema
export const verifyOtpSchema = z.object({
  token: z
    .string()
    .min(6, "Token harus 6 digit")
    .max(6, "Token harus 6 digit")
    .regex(/^[0-9]+$/, "Token hanya boleh angka"),
});

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
