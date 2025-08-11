"use client";

import LoginProviderButtons from "@/components/LoginProvidersButtons/LoginProviderButtons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type loginFormData = z.infer<typeof loginFormSchema>;

const loginFormSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(8, "Password must be at least 8 chars long"),
});

const LoginForm = () => {
  const form = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = (values: loginFormData) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLogin)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">Login</Button>
      </form>
      <LoginProviderButtons />
    </Form>
  );
};
export default LoginForm;
