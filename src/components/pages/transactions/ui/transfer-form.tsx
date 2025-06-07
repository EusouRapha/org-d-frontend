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
  useGetAllAccountsQuery,
} from "../hooks/use-transaction-queries";
import {
  TransactionOperationEnum,
  TransactionTypeEnum,
} from "../transaction-constants";

const TransferFormSchema = z.object({
  sourceAccount: z.string({
    required_error: "Selecione a conta de origem",
  }),
  destinationAccount: z.string({
    required_error: "Selecione a conta de destino",
  }),
  value: z
    .number({
      required_error: "Informe o valor da transferência",
      invalid_type_error: "Informe um valor numérico válido",
    })
    .positive("O valor deve ser maior que 0")
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toFixed(2)), {
      message: "Informe no máximo duas casas decimais",
    }),
});

export function TransferForm() {
  const session = useSession();
  const clientId = session.data?.user?.id;

  const getAccountsQuery = useGetAccountsQuery(clientId ?? 0);
  const getallAccountsQuery = useGetAllAccountsQuery();

  const form = useForm<z.infer<typeof TransferFormSchema>>({
    resolver: zodResolver(TransferFormSchema),
    defaultValues: {
      value: 0,
    },
  });

  const totalBalance = getAccountsQuery.data?.reduce(
    (acc, account) => acc + (account.balance ?? 0),
    0
  );

  const createTransactionMutation = useCreateTransactionMutation(
    session.data?.access_token,
    clientId ?? 0,
    TransactionTypeEnum.DEBIT
  );

  async function handleTransfer({
    sourceAccount,
    destinationAccount,
    value,
  }: z.infer<typeof TransferFormSchema>) {
    const sourceAccountData = getAccountsQuery.data?.find(
      (acc) => acc.account_number === sourceAccount
    );

    const destinationAccountData = getallAccountsQuery.data?.find(
      (acc) => acc.account_number === destinationAccount
    );

    if (
      sourceAccountData?.account_number ===
      destinationAccountData?.account_number
    ) {
      toast.error("Conta de origem e destino não podem ser iguais", {
        style: {
          background: "red",
          color: "white",
        },
      });
      return;
    }

    if (
      sourceAccountData?.balance !== undefined &&
      sourceAccountData.balance < 0
    ) {
      toast.error(
        "Conta de origem está com saldo negativo, não é possível realizar a transferência",
        {
          style: {
            background: "red",
            color: "white",
          },
        }
      );
      return;
    }

    const balanceMoreLimit =
      (sourceAccountData?.balance ?? 0) + (sourceAccountData?.limit ?? 0);

    if (value > balanceMoreLimit) {
      toast.error(
        "Saldo (Saldo + limite) insuficiente na conta de origem para realizar a transferência",
        {
          style: {
            background: "red",
            color: "white",
          },
        }
      );
      return;
    }

    let newValue: number = value;
    if (totalBalance && value > totalBalance) {
      newValue = value - 0.1 * value;
      toast.warning(
        "Valor maior que o saldo total das contas, aplicando desconto de 10%",

        {
          style: {
            background: "yellow",
            color: "black",
          },
        }
      );
    }

    createTransactionMutation.mutateAsync({
      accountNumber: sourceAccount,
      value: newValue,
      operation: TransactionOperationEnum.TRANSFER,
      transferType: TransactionTypeEnum.DEBIT,
    });

    createTransactionMutation.mutateAsync({
      accountNumber: destinationAccount,
      value: newValue,
      operation: TransactionOperationEnum.TRANSFER,
      transferType: TransactionTypeEnum.CREDIT,
    });
  }

  return (
    <Form {...form}>
      <Toaster position="top-right" />
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleTransfer)}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="sourceAccount"
            render={({ field }) => (
              <FormItem className="flex flex-col w-72 max-[768px]:text-sm max-[768px]:w-70">
                <FormLabel>Conta de Origem</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-org-d-pessego text-lg md:text-base lg:text-lg max-[768px]:text-sm max-[768px]:h-10 max-[375px]:text-xs max-[375px]:h-8">
                      <SelectValue placeholder="Selecione a conta de origem" />
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
            name="destinationAccount"
            render={({ field }) => (
              <FormItem className="flex flex-col w-72 max-[768px]:text-sm max-[768px]:w-70">
                <FormLabel>Conta de Destino</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-org-d-pessego text-lg md:text-base lg:text-lg max-[768px]:text-sm max-[768px]:h-10 max-[375px]:text-xs max-[375px]:h-8">
                      <SelectValue placeholder="Selecione a conta de destino" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getallAccountsQuery.data?.map((account) => (
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
              <FormItem className="flex flex-col w-64 max-[768px]:text-sm max-[768px]:w-70">
                <FormLabel>Valor da transferência</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o valor da transferência"
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
            <H4 className="text-org-d-pessego font-semibold">Transferir</H4>
          </Button>
        </div>
      </form>
    </Form>
  );
}
