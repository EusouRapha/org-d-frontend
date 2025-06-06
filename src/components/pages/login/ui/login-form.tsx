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
import { toast, Toaster } from "sonner";
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
      .replace(/\D/g, "") //
      .replace(/(\d{3})(\d)/, "$1.$2") //
      .replace(/(\d{3})(\d)/, "$1.$2") //
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await signIn("credentials", {
      cpf: values.cpf,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Erro ao fazer login. Verifique suas credenciais.", {
        style: {
          background: "red",
          color: "white",
        },
      });
      return;
    }
    router.push("/");
  }

  const buttons = [
    {
      label: "Logar",
      onClick: form.handleSubmit(onSubmit),
      className:
        "bg-org-d-pessego cursor-pointer text-2xl text-org-d-green hover:bg-green-950 hover:text-org-d-pessego transition duration-300 ease-in-outmax-[768px]:text-lg max-[768px]:px-4 max-[768px]:py-2 max-[375px]:text-base max-[375px]:px-3 max-[375px]:py-1.5",
    },
    {
      label: "Cadastrar",
      onClick: () => router.push("/registrar"),
      className:
        "bg-org-d-pessego text-2xl text-org-d-green hover:bg-green-950 hover:text-org-d-pessego transition duration-300 ease-in-out cursor-pointer max-[768px]:text-lg max-[768px]:px-4 max-[768px]:py-2 max-[375px]:text-base max-[375px]:px-3 max-[375px]:py-1.5",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full h-full px-4 max-[768px]:px-2 max-[375px]:px-1">
      <Toaster position="top-right" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem className="pb-2">
                <FormLabel className="text-org-d-pessego cursor-not-allowed text-2xl max-[768px]:text-lg max-[375px]:text-base">
                  CPF
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite aqui seu cpf"
                    type="cpf"
                    className="w-full h-12 !text-lg bg-org-d-pessego max-[768px]:h-10 max-[768px]:text-base max-[375px]:h-8 max-[375px]:text-sm"
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
                <FormLabel className="text-org-d-pessego text-2xl max-[768px]:text-lg max-[375px]:text-base">
                  Senha
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite aqui sua senha"
                    type="password"
                    className="w-full h-12 !text-lg bg-org-d-pessego max-[768px]:h-10 max-[768px]:text-base max-[375px]:h-8 max-[375px]:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-6 items-start pt-4 max-[768px]:flex-col max-[768px]:gap-4 max-[375px]:gap-2">
            {buttons.map((button, index) => (
              <Button
                key={index}
                type="button"
                className={button.className}
                onClick={button.onClick}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </form>
      </Form>
    </div>
  );
}
