import type z from "zod";
import type { registerFormSchema } from "./zod/zod-schemas";

export type registerFormData = z.infer<typeof registerFormSchema>;
