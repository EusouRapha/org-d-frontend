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
import { toast, Toaster } from "sonner";
import { z } from "zod";
import {
  useCreateTransactionMutation,
  useGetAccountsQuery,
} from "../hooks/use-transaction-queries";
import {
  TransactionOperationEnum,
  TransactionTypeEnum,
} from "../transaction-constants";

const FormSchema = z.object({
  account: z.string({
    required_error: "Selecione uma conta",
  }),
  value: z
    .number({
      required_error: "Informe o valor da transação",
      invalid_type_error: "Informe um valor numérico válido",
    })
    .positive("O valor deve ser maior que 0")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toFixed(2)), {
      message: "Informe no máximo duas casas decimais",
    }),
});

type TransactionFormProps = {
  type: TransactionTypeEnum;
};

export function TransactionForm({ type }: TransactionFormProps) {
  const session = useSession();
  const clientId = session.data?.user?.id;

  const getAccountsQuery = useGetAccountsQuery(clientId ?? 0);

  const createTransactionMutation = useCreateTransactionMutation(
    session.data?.access_token,
    clientId ?? 0,
    type
  );

  async function handleCreateTransaction({
    account,
    value,
  }: z.infer<typeof FormSchema>) {
    if (value <= 0) {
      return;
    }

    const selectedAccount = getAccountsQuery.data?.find(
      (acc) => acc.account_number === account
    );

    const balanceMoreLimit =
      (selectedAccount?.balance ?? 0) + (selectedAccount?.limit ?? 0);

    if (
      type === TransactionTypeEnum.DEBIT &&
      selectedAccount &&
      value > balanceMoreLimit
    ) {
      toast.error(
        "Saldo (Saldo + limite) insuficiente para realizar o transação",
        {
          style: {
            background: "red",
            color: "white",
          },
        }
      );
      return;
    }

    createTransactionMutation.mutateAsync({
      accountNumber: account,
      value: value,
      operation:
        type === TransactionTypeEnum.DEBIT
          ? TransactionOperationEnum.WITHDRAW
          : TransactionOperationEnum.DEPOSIT,
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
        onSubmit={form.handleSubmit(handleCreateTransaction)}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem className="flex flex-col w-2xl max-[768px]:text-sm max-[768px]:w-70">
                <FormLabel>Conta</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-org-d-pessego text-lg md:text-base lg:text-lg max-[768px]:text-sm max-[768px]:h-10 max-[375px]:text-xs max-[375px]:h-8">
                      <SelectValue placeholder="Selecione uma conta" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getAccountsQuery.data?.map((account) => (
                      <SelectItem
                        key={account.account_number}
                        value={account.account_number}
                      >
                        {account.account_number} - Saldo Atual: R$
                        {account.balance.toFixed(2)} - Limite Atual: R$
                        {account.limit.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="mt-1">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="flex flex-col w-auto">
                <FormLabel>Valor da transação</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o valor da transação"
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full bg-org-d-pessego text-lg md:text-base lg:text-lg max-[768px]:text-sm max-[768px]:h-10 max-[375px]:text-xs max-[375px]:h-8"
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
        <div className="flex justify-start">
          <Button
            type="submit"
            className="bg-org-d-green hover:bg-green-800 text-org-d-pessego font-semibold rounded-2xl w-32"
          >
            <H4 className="text-org-d-pessego font-semibold">
              {type === TransactionTypeEnum.DEBIT ? "Saque" : "Depósito"}
            </H4>
          </Button>
        </div>
      </form>
    </Form>
  );
}
