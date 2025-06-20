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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { H1 } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";

export default function ProfilePage() {
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

  const [isEditModeDisabled, setIsEditModeDisabled] = React.useState(true);

  function formatPhoneNumber(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }

  function handleSubmit(values: z.infer<typeof formSchema>) {
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
    const successMessage = "Cliente editado com sucesso!";
    toast.success(successMessage, {
      style: {
        background: "green",
        color: "white",
      },
    });
  }

  return (
    <>
      <div suppressHydrationWarning>
        <Toaster position="top-right" />

        <H1 className="text-org-d-green font-bold text-center pt-8">Perfil</H1>
        <div className="flex flex-col justify-center items-center  mx-auto pt-24">
          <CircleUserRound size={200} strokeWidth={1} color="#00801C" />
          <div className="flex items-center space-x-4">
            <Switch
              id="edit-mode"
              className="border-gray-500 scale-120"
              onCheckedChange={() => setIsEditModeDisabled(!isEditModeDisabled)}
            />
            <Label
              htmlFor="edit-mode"
              className="text-xl text-org-d-green font-bold"
            >
              Modo edição
            </Label>
          </div>
          <Form {...form}>
            <form
              className="flex flex-col"
              onSubmit={form.handleSubmit(handleSubmit)}
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
                        <Input
                          placeholder="Digite aqui seu nome"
                          type="text"
                          className="h-12 !text-lg bg-org-d-pessego border-org-d-green"
                          {...field}
                        />
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
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-6 items-start pt-4">
                <Button
                  type="submit"
                  disabled={isEditModeDisabled}
                  className="bg-org-d-green text-2xl text-org-d-pessego hover:bg-green-950 cursor-pointer hover:text-org-d-pessego transition duration-300 ease-in-out"
                  onClick={() => form.handleSubmit(handleSubmit)}
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
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
