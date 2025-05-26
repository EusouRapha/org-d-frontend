"use client";

import { CardButton } from "@/components/ui/card-button";
import { UserPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCreateAccountMutation } from "./hooks/use-accounts-queries";
import { columns } from "./ui/columns";
import { DataTable } from "./ui/data-table";
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
    <>
      <Toaster position="top-right" />
      <H1 className="text-org-d-green font-bold text-center pr-16 pt-8">
        Contas
      </H1>
      <div className="flex flex-col justify-center items-center h-screen mx-auto">
        <div className="flex flex-col w-2/3 h-3/4 gap-16">
          <div>
            <CardButton
              key={"Criar conta"}
              icon={<UserPlus size={48} />}
              onClick={() => {
                handleCreateAccount(clientId);
              }}
              className="w-56 h-32 !text-2xl"
            >
              Criar conta
            </CardButton>
          </div>
          <div className="flex flex-col justify-center align-center">
            <DataTable columns={columns} clientId={clientId ?? 0} />
          </div>
        </div>
      </div>
    </>
  );
}
