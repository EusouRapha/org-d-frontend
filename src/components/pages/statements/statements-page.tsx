"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { H1 } from "@/components/ui/typography";
import { useSession } from "next-auth/react";
import React from "react";
import { Toaster } from "sonner";
import { Account, useGetAccountsQuery } from "./hooks/use-statements-queries";
import AccountDetails from "./ui/acount-details";
import AccountSelect from "./ui/account-select";

export default function StatementsPage() {
  const session = useSession();
  const clientId = session.data?.user?.id;

  const [selectedAccount, setSelectedAccount] = React.useState<string | null>(
    "all"
  );

  const getAccountsQuery = useGetAccountsQuery(clientId ?? 0);

  const accounts: Account[] | undefined = getAccountsQuery.data;

  const filteredAccounts = React.useMemo(() => {
    if (selectedAccount === "all") {
      return accounts;
    }
    return accounts?.filter(
      (account) => account.id.toString() === selectedAccount
    );
  }, [accounts, selectedAccount]);

  const handleSelectAccount = (accountId: string) => {
    setSelectedAccount(accountId);
  };

  return (
    <div suppressHydrationWarning>
      <Toaster position="top-right" />
      <H1 className="text-org-d-green font-bold text-center pt-8">Extratos</H1>
      <div className="flex flex-col justify-center items-center h-screen mx-auto pb-16">
        <div className="flex flex-col w-2/3 h-3/4 bg-white gap-4 overflow-y-auto p-8 rounded-lg shadow-lg">
          {getAccountsQuery.isPending ? (
            <>
              <Skeleton className="w-[180px] max-[768px]:w-34 h-9 bg-gray-100" />
              <Skeleton className="w-full h-30 mb-4 bg-gray-100" />
              <Skeleton className="w-full h-30 mb-4 bg-gray-100" />
              <Skeleton className="w-full h-30 mb-4 bg-gray-100" />
            </>
          ) : (
            <>
              <AccountSelect
                accounts={accounts}
                handleSelectAccount={handleSelectAccount}
              />
              <AccountDetails
                accounts={filteredAccounts}
                selectedAccount={selectedAccount}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
