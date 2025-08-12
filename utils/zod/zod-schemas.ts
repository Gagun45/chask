import z from "zod";

export const registerFormSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(8, "Password must be at least 8 chars long"),
  name: z.string().optional(),
});

export const loginFormSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(8, "Password must be at least 8 chars long"),
});

export const newTeamFormSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 chars long"),
  description: z.string().optional(),
});
