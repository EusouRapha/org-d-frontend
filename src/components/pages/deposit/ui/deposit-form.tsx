"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { H4 } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useCreateDepositMutation,
  useGetAccountQuery,
} from "../hooks/use-deposit-queries";
import { Toaster } from "sonner";

const FormSchema = z.object({
  account: z.string({
    required_error: "Selecione uma conta para depositar",
  }),
  value: z
    .string({
      required_error: "Informe o valor do depósito",
    })
    .refine((val) => val !== "0", {
      message: "O valor não pode ser 0",
    })
    .refine((val) => /^[1-9]\d*(,|\.)?\d{0,2}$|^0(,|\.)\d{1,2}$/.test(val), {
      message: "Informe um valor válido",
    }),
});

export function DepositForm() {
  const session = useSession();
  const clientId = session.data?.user?.id;

  const getAccountsQuery = useGetAccountQuery(clientId ?? 0);

  const createDepositMutation = useCreateDepositMutation(
    session.data?.access_token
  );

  async function handleCreateDeposit({
    account,
    value,
  }: z.infer<typeof FormSchema>) {
    // Converte a string para número, substituindo vírgula por ponto
    const numericValue = parseFloat(value.replace(",", "."));
    if (numericValue <= 0) {
      console.error("O valor deve ser maior que 0");
      return;
    }

    createDepositMutation.mutateAsync({
      accountNumber: account,
      value: numericValue,
    });
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      account: "",
      value: "0", // Inicia o input com 0
    },
  });

  return (
    <Form {...form}>
      <Toaster position="top-right" />
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleCreateDeposit)}
      >
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conta</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="!w-lg bg-org-d-pessego !text-lg">
                      <SelectValue placeholder="Selecione uma conta para depositar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getAccountsQuery.data?.map((account) => (
                      <SelectItem
                        key={account.accountNumber}
                        value={account.accountNumber}
                      >
                        {account.accountNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do depósito</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o valor do depósito"
                    type="text" // Trabalha com strings
                    className="!w-64 bg-org-d-pessego !text-lg"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      let value = e.target.value;

                      // Remove caracteres inválidos
                      value = value.replace(/[^0-9.,]/g, "");

                      // Não permite começar com ponto ou vírgula
                      if (value.startsWith(".") || value.startsWith(",")) {
                        value = "0" + value;
                      }

                      // Remove zeros à esquerda, exceto se for "0," ou "0."
                      if (/^0[0-9]+/.test(value)) {
                        value = value.replace(/^0+/, "0");
                      }

                      // Impede "0," ou "0."
                      if (value === "0," || value === "0.") {
                        value = "0";
                      }

                      // Atualiza o valor no formulário
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row justify-start">
          <div
            key="deposit-action"
            role="button"
            className="w-32 text-org-d-pessego bg-org-d-green rounded-2xl hover:bg-green-950 hover:text-org-d-pessego cursor-pointer items-center transition duration-300 ease-in-out text-center"
            onClick={form.handleSubmit(handleCreateDeposit)}
          >
            <H4 className="text-org-d-pessego font-semibold">Depositar</H4>
          </div>
        </div>
      </form>
    </Form>
  );
}
