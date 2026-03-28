import z from "zod";

const formSchema = z.object({
  token: z
    .string()
    .min(6, "Token harus 6 digit")
    .max(6, "Token harus 6 digit")
    .regex(/^[0-9]+$/, "Token hanya boleh angka"),
});

type FormValues = z.infer<typeof formSchema>;

export { formSchema };
export type { FormValues };
