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
import { register } from "@/utils/actions/auth.actions";
import type { registerFormData } from "@/utils/types";
import { registerFormSchema } from "@/utils/zod/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const form = useForm<registerFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onLogin = async (values: registerFormData) => {
    await register(values);
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">Register</Button>
      </form>
      <LoginProviderButtons />
    </Form>
  );
};
export default RegisterForm;
