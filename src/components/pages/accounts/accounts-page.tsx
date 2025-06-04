"use client";

import { CardButton } from "@/components/ui/card-button";
import { UserPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCreateAccountMutation } from "./hooks/use-accounts-queries";
import { columns } from "./ui/columns";
import { AccountsTable } from "./ui/accounts-table";
import { Toaster } from "sonner";
import { H1 } from "@/components/ui/typography";
import React from "react";

export default function AccountsPage() {
  const session = useSession();
  const clientId = session.data?.user?.id;

  const createAccountMutation = useCreateAccountMutation(
    session.data?.access_token
  );

  async function handleCreateAccount(clientId: number | undefined) {
    createAccountMutation.mutateAsync(clientId ?? 0);
  }

  return (
    <div suppressHydrationWarning>
      <Toaster position="top-right" />
      <H1 className="text-org-d-green font-bold text-center pt-8">Contas</H1>
      <div className="flex flex-col justify-center items-center h-screen mx-auto px-4 max-[768px]:px-2 max-[375px]:px-1">
        <div className="flex flex-col w-2/3 h-3/4 gap-4 max-[768px]:gap-0 max-[768px]:w-full max-[768px]:h-auto">
          <div>
            <CardButton
              key={"Criar conta"}
              icon={
                <UserPlus
                  size={48}
                  className="max-[768px]:w-8 max-[768px]:h-8 max-[375px]:w-6 max-[375px]:h-6 "
                />
              }
              onClick={() => {
                handleCreateAccount(clientId);
              }}
              className="w-56 h-32 !text-2xl max-[768px]:w-auto max-[768px]:h-28 max-[768px]:!text-xl max-[375px]:h-24 max-[375px]:!text-lg"
            >
              Criar conta
            </CardButton>
          </div>
          <div className="flex flex-col justify-center align-center overflow-x-auto max-[768px]:w-full">
            <AccountsTable columns={columns} clientId={clientId ?? 0} />
          </div>
        </div>
      </div>
    </div>
  );
}
