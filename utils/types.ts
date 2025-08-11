import type z from "zod";
import type { loginFormSchema, registerFormSchema } from "./zod/zod-schemas";

export type registerFormData = z.infer<typeof registerFormSchema>;
export type loginFormData = z.infer<typeof loginFormSchema>;
