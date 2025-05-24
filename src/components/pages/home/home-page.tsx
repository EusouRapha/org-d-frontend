"use client";
import { CardButton } from "@/components/ui/card-button";
import {
  handleAccountsRedirect,
  handleDepositRedirect,
  handleStatementRedirect,
  handleWithdrawRedirect,
} from "@/lib/utils";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  LogOut,
  Receipt,
  UserPlus,
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function HomePage() {
  const cardButtons = [
    {
      label: "Contas",
      icon: <UserPlus size={48} />,
      onClick: () => handleAccountsRedirect(),
    },
    {
      label: "Saque",
      icon: <BanknoteArrowDown size={48} />,
      onClick: () => handleWithdrawRedirect(),
    },
    {
      label: "Deposito",
      icon: <BanknoteArrowUp size={48} />,
      onClick: () => handleDepositRedirect(),
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
      <div className="flex flex-col justify-center items-center h-full gap-8 xl:flex-row">
        {cardButtons.map((button) => (
          <CardButton
            key={button.label}
            icon={button.icon}
            onClick={button.onClick}
          >
            {button.label}
          </CardButton>
        ))}
      </div>
    </>
  );
}
