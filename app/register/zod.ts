import z from "zod";

const formSchema = z
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

type FormValues = z.infer<typeof formSchema>;

export { formSchema };
export type { FormValues };
