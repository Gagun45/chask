import type z from "zod";
import type { loginFormSchema, newTeamFormSchema, registerFormSchema } from "./zod/zod-schemas";

export type registerFormData = z.infer<typeof registerFormSchema>;
export type loginFormData = z.infer<typeof loginFormSchema>;
export type newTeamFormData = z.infer<typeof newTeamFormSchema>;
