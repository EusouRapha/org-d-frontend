"use client";

import api from "@/app/api/auth/[...nextauth]/axios";
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
import { Toaster } from "@/components/ui/sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function RegisterForm() {
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(1, { message: "Nome inválido" }),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
      .max(14),
    password: z.string().min(1, { message: "Senha inválida" }),
    phone_number: z
      .string()
      .min(1, { message: "Telefone inválido" })
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: "Telefone inválido" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      password: "",
      phone_number: "",
    },
  });

  function formatCPF(value: string) {
    if (value.length > 14) {
      return value.slice(0, 14);
    }
    return value
      .replace(/\D/g, "") // Remove caracteres não numéricos
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o primeiro ponto
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o segundo ponto
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o traço
  }

  function formatPhoneNumber(value: string) {
    return value
      .replace(/\D/g, "") // Remove caracteres não numéricos
      .replace(/(\d{2})(\d)/, "($1) $2") // Adiciona parênteses no DDD
      .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona o traço após os 5 primeiros dígitos
      .slice(0, 15); // Limita o tamanho máximo
  }

  const mutation = useMutation({
    mutationFn: (newClient: z.infer<typeof formSchema>) => {
      return api.post("/clients", newClient);
    },
    onSuccess: () => {
      const successMessage = "Cliente cadastrado com sucesso!";
      toast.success(successMessage, {
        style: {
          background: "green",
          color: "white",
        },
      });
      setTimeout(() => {
        toast.dismiss();
        router.push("/login");
      }, 2000);
    },
    onError: () => {
      const errorMessage =
        "Ocorreu um erro ao cadastrar o cliente. Verifique o formulario ou tente novamente mais tarde.";
      toast.error(errorMessage, {
        style: {
          background: "red",
          color: "white",
        },
      });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutateAsync({
      ...values,
    });

    if (mutation.isSuccess) {
      router.push("/login");
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex flex-col items-center w-full h-full ">
        <Form {...form}>
          <form
            className="flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="pb-2">
                    <FormLabel className="text-org-d-pessego cursor-not-allowed text-2xl">
                      Nome
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite aqui seu nome"
                        type="text"
                        className="h-12 !text-lg bg-org-d-pessego"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-6">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="pb-2">
                    <FormLabel className="text-org-d-pessego cursor-not-allowed text-2xl">
                      CPF
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite aqui seu cpf"
                        type="cpf"
                        className="h-12 !text-lg bg-org-d-pessego"
                        {...field}
                        onChange={(e) => {
                          field.onChange(formatCPF(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="pb-2">
                    <FormLabel className="text-org-d-pessego cursor-not-allowed text-2xl">
                      Senha
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite aqui sua senha"
                        type="password"
                        className="h-12 !text-lg bg-org-d-pessego"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem className="pb-2">
                    <FormLabel className="text-org-d-pessego text-2xl">
                      Telefone
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite aqui seu telefone"
                        type="text"
                        className="h-12 !text-lg bg-org-d-pessego"
                        {...field}
                        onChange={(e) => {
                          field.onChange(formatPhoneNumber(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-6 items-start pt-4">
              <Button
                type="submit"
                className="bg-org-d-pessego text-2xl text-org-d-green hover:bg-green-950 hover:text-org-d-pessego transition duration-300 ease-in-out"
                onClick={() => form.handleSubmit(onSubmit)}
              >
                Registrar
              </Button>
              <Button
                type="button"
                onClick={() => router.push("/login")}
                className="bg-org-d-pessego text-2xl text-org-d-green hover:bg-green-950 hover:text-org-d-pessego transition duration-300 ease-in-out"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
