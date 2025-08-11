"use client";

import LoadingButton from "@/components/LoadingButton";
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
import type { loginFormData } from "@/utils/types";
import { loginFormSchema } from "@/utils/zod/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = (values: loginFormData) => {
    startTransition(async () => {
      const res = await signIn("credentials", { ...values, redirect: false });
      if (res.error) {
        form.setError("root", { message: "Invalid credentials" });
        return;
      }
      if (res.ok) {
        toast.success("Logged in successfully");
        redirect("/");
      }
    });
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
        <FormMessage className="authErrorFormMessage">{form.formState.errors.root?.message}</FormMessage>
        {isPending ? (
          <LoadingButton className="w-full" />
        ) : (
          <Button type="submit" className="w-full">Login</Button>
        )}
      </form>
      <LoginProviderButtons />
    </Form>
  );
};
export default LoginForm;
