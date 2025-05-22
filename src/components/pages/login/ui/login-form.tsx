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
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginForm() {
  const formSchema = z.object({
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
      .max(14),
    password: z.string().min(1, { message: "Senha inválida" }),
  });

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
      password: "",
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signIn("credentials", {
      cpf: values.cpf,
      password: values.password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <div className="flex flex-col items-center w-full h-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem className="pb-2">
                <FormLabel className="text-blue-950 cursor-not-allowed">
                  CPF
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite aqui seu cpf"
                    type="cpf"
                    className="w-lg h-12 !text-lg "
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
                <FormLabel className="text-blue-950 cursor-not-allowed">
                  Senha
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite aqui sua senha"
                    type="password"
                    className="w-lg h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-2 items-center justify-evenly">
            <Button type="button" onClick={() => router.push("/registrar")}>
              Cadastrar
            </Button>
            <Button type="submit" onClick={() => form.handleSubmit(onSubmit)}>
              Enviar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
