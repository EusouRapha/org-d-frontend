"use client";
import { CardButton } from "@/components/ui/card-button";
import { H1 } from "@/components/ui/typography";
import {
  handleAccountsRedirect,
  handleStatementRedirect,
  handleTransactionsRedirect,
} from "@/lib/utils";
import { BanknoteArrowDown, LogOut, Receipt, UserPlus } from "lucide-react";
import { signOut } from "next-auth/react";

export default function HomePage() {
  const cardButtons = [
    {
      label: "Contas",
      icon: <UserPlus size={48} />,
      onClick: () => handleAccountsRedirect(),
    },
    {
      label: "Transações",
      icon: <BanknoteArrowDown size={48} />,
      onClick: () => handleTransactionsRedirect(),
    },
    {
      label: "Extrato",
      icon: <Receipt size={48} />,
      onClick: () => handleStatementRedirect(),
    },
    {
      label: "Sair",
      icon: <LogOut size={48} />,
      onClick: () => signOut(),
    },
  ];

  return (
    <>
      <div suppressHydrationWarning>
        <H1 className="text-org-d-green font-bold text-center pt-8">
          Seja bem vindo(a) ao ORG-D
        </H1>
      </div>
      <div className="flex flex-row justify-center items-center gap-8 max-[1650px]:flex-col h-full pb-36">
        {cardButtons.map((button) => (
          <CardButton
            key={button.label}
            icon={button.icon}
            onClick={button.onClick}
            className="max-[1650px]:w-56 max-[1650px]:h-32"
          >
            {button.label}
          </CardButton>
        ))}
      </div>
    </>
  );
}
