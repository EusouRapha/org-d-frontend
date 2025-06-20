"use client";

import { TransactionTypeEnum } from "@/components/pages/transactions/transaction-constants";
import { TransactionForm } from "@/components/pages/transactions/ui/transaction-form";
import { H1 } from "@/components/ui/typography";
import { useSession } from "next-auth/react";
import { useGetAccountsQuery } from "./hooks/use-transaction-queries";
import { TransferForm } from "./ui/transfer-form";

export default function DepositPage() {
  const session = useSession();
  const clientId = session.data?.user?.id;

  const getAccountsQuery = useGetAccountsQuery(clientId ?? 0);
  const totalBalance = getAccountsQuery.data?.reduce(
    (acc, account) => acc + (account.balance ?? 0),
    0
  );

  return (
    <div suppressHydrationWarning>
      <H1 className="text-org-d-green font-bold text-center pt-8">
        Transações
      </H1>
      <div className="flex flex-col justify-center items-center h-screen mx-auto px-4 max-[768px]:px-2 max-[375px]:px-1">
        <div className="flex flex-col h-3/4 gap-16 max-[768px]:gap-8 max-[375px]:gap-4">
          <div className="flex flex-col justify-center align-center gap-8 max-[768px]:gap-4 max-[375px]:gap-2">
            <TransactionForm type={TransactionTypeEnum.CREDIT} />
            <TransactionForm type={TransactionTypeEnum.DEBIT} />
            <TransferForm />

            <div className="flex items-center justify-between space-x-2 max-[768px]:flex-col max-[768px]:space-x-0 max-[768px]:gap-2">
              <div className="text-sm text-gray-600">
                {`Saldo total das contas:  R$${totalBalance ?? 0}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
