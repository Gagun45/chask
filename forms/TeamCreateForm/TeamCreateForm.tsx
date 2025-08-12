"use client";

import LoadingButton from "@/components/LoadingButton";
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
import { createNewTeam } from "@/utils/actions/team.actions";
import type { newTeamFormData } from "@/utils/types";
import { newTeamFormSchema } from "@/utils/zod/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const TeamCreateForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<newTeamFormData>({
    resolver: zodResolver(newTeamFormSchema),
    defaultValues: {
      description: "",
      name: "",
    },
  });

  const onCreateNewTeam = (values: newTeamFormData) => {
    startTransition(async () => {
      const res = await createNewTeam(values);
      if (res.error) {
        form.setError("root", { message: res.error });
        return;
      }
      if (res.success) {
        toast.success("Team created");
        redirect("/");
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCreateNewTeam)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Team Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Information..." {...field} />
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
          <Button type="submit" className="w-full tracking-widest text-lg">
            Create
          </Button>
        )}
      </form>
    </Form>
  );
};
export default TeamCreateForm;
