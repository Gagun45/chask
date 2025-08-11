import z from "zod";

export const registerFormSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(8, "Password must be at least 8 chars long"),
  name: z.string("Enter your name please"),
});

export const loginFormSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(8, "Password must be at least 8 chars long"),
});
