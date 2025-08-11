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
import { register } from "@/utils/actions/auth.actions";
import type { registerFormData } from "@/utils/types";
import { registerFormSchema } from "@/utils/zod/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<registerFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onLogin = (values: registerFormData) => {
    startTransition(async () => {
      const res = await register(values);
      if (res.error) {
        form.setError("root", { message: "Something went wrong" });
        return;
      }
      if (res.success) {
        toast.success("User created");
        redirect("/login");
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

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-xs">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage className="authErrorFormMessage">
          {form.formState.errors.root?.message}
        </FormMessage>
        {isPending ? (
          <LoadingButton className="w-full" />
        ) : (
          <Button className="w-full tracking-widest text-lg">Register</Button>
        )}
      </form>
      <LoginProviderButtons />
    </Form>
  );
};
export default RegisterForm;
