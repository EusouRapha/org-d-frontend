"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import IconButton from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  useDeleteClientMutation,
  useUpdateClientMutation,
} from "../hooks/use-profile-queries";
import { ProfileDeleteDialog } from "./profile-delete-dialog";

type ProfileFormProps = {
  isEditModeDisabled: boolean;
};

export function ProfileForm({ isEditModeDisabled }: ProfileFormProps) {
  const session = useSession();
  const router = useRouter();

  const formSchema = z.object({
    name: z.string(),
    phone_number: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "",
    },
  });

  const [hasInitialized, setHasInitialized] = React.useState(false);

  React.useEffect(() => {
    if (session.data?.user && !hasInitialized) {
      form.reset({
        name: session.data.user.name,
        phone_number: session.data.user.phone_number,
      });
      setHasInitialized(true);
    }
  }, [session.data, form, hasInitialized]);

  function formatPhoneNumber(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }

  const updateClientMutation = useUpdateClientMutation(
    session.data?.access_token
  );

  const deleteClientMutation = useDeleteClientMutation(
    session.data?.access_token
  );

  const handleDeleteClient = async () => {
    deleteClientMutation.mutateAsync(session.data?.user?.id ?? 0);
    signOut();
  };

  function handleEditClient(values: z.infer<typeof formSchema>) {
    if (values.name?.trim() === "" && values.phone_number?.trim() === "") {
      const errorMessage = "Pelo menos um campo deve ser preenchido";
      toast.error(errorMessage, {
        style: {
          background: "red",
          color: "white",
        },
      });
      return;
    }
    updateClientMutation.mutateAsync({
      clientId: session.data?.user?.id ?? 0,
      name: values.name,
      phone_number: values.phone_number,
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col"
        onSubmit={form.handleSubmit(handleEditClient)}
      >
        <div className="mb-4">
          <FormField
            control={form.control}
            name="name"
            disabled={isEditModeDisabled}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-org-d-green cursor-not-allowed text-2xl">
                  Nome
                </FormLabel>
                <FormControl>
                  {session.status === "loading" ? (
                    <Skeleton className="w-full h-12 bg-gray-300" />
                  ) : (
                    <Input
                      placeholder="Digite aqui seu nome"
                      type="text"
                      className="h-12 !text-lg bg-org-d-pessego border-org-d-green"
                      {...field}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl text-org-d-green">
                Telefone
              </FormLabel>
              <FormControl>
                {session.status === "loading" ? (
                  <Skeleton className="w-full h-12 bg-gray-300" />
                ) : (
                  <Input
                    placeholder="Digite aqui seu telefone"
                    type="text"
                    disabled={isEditModeDisabled}
                    className="h-12 !text-lg bg-org-d-pessego border-org-d-green"
                    {...field}
                    onChange={(e) => {
                      field.onChange(formatPhoneNumber(e.target.value));
                    }}
                  />
                )}
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-6 items-start pt-4">
          <Button
            type="submit"
            disabled={isEditModeDisabled}
            className="bg-org-d-green text-2xl text-org-d-pessego hover:bg-green-950 cursor-pointer hover:text-org-d-pessego transition duration-300 ease-in-out"
            onClick={() => form.handleSubmit(handleEditClient)}
          >
            Editar
          </Button>
          <Button
            type="button"
            disabled={isEditModeDisabled}
            onClick={() => router.push("/")}
            className="bg-org-d-green text-2xl  text-org-d-pessego hover:bg-green-950 cursor-pointer hover:text-org-d-pessego transition duration-300 ease-in-out"
          >
            Cancelar
          </Button>
          <ProfileDeleteDialog onClick={handleDeleteClient}>
            <IconButton
              key="delete"
              disabled={isEditModeDisabled}
              icon={<Trash2 color="#fff7f5" />}
              className="bg-red-600 h-9"
            />
          </ProfileDeleteDialog>
        </div>
      </form>
    </Form>
  );
}
