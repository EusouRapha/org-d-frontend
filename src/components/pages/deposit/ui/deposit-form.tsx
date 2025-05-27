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
    .number({
      required_error: "Informe o valor do depósito",
      invalid_type_error: "Informe um valor numérico válido",
    })
    .positive("O valor deve ser maior que 0")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toFixed(2)), {
      message: "Informe no máximo duas casas decimais",
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
    if (value <= 0) {
      console.error("O valor deve ser maior que 0");
      return;
    }
    createDepositMutation.mutateAsync({
      accountNumber: account,
      value,
    });
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      value: 0,
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
          {/* === FormField da Conta === */}
          <FormField
            control={form.control}
            name="account"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Conta</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value); // Atualiza o valor no react-hook-form
                  }}
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

                {/* Mensagem de erro exibida apenas no submit */}
                {fieldState.error && (
                  <div className="mt-1 text-red-500 text-sm">
                    {fieldState.error.message}
                  </div>
                )}
              </FormItem>
            )}
          />

          {/* === FormField do Valor === */}
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Valor do depósito</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o valor do depósito"
                    type="number"
                    step="0.01"
                    min="0"
                    className="!w-64 bg-org-d-pessego !text-lg"
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      const n = e.target.valueAsNumber;
                      if (isNaN(n) || n < 0) {
                        field.onChange(0);
                      } else {
                        field.onChange(Math.floor(n * 100) / 100);
                      }
                    }}
                  />
                </FormControl>
                <div className="mt-1">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Botão que será empurrado somente se houver erro */}
        <div className="flex">
          <button
            type="submit"
            className="w-32 text-org-d-pessego bg-org-d-green rounded-2xl hover:bg-green-950 transition duration-300 ease-in-out"
          >
            <H4 className="text-org-d-pessego font-semibold">Depositar</H4>
          </button>
        </div>
      </form>
    </Form>
  );
}
