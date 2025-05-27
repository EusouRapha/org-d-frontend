"use client";

import {
  handleAccountsRedirect,
  handleHomeRedirect,
  handleStatementRedirect,
  handleTransactionsRedirect,
} from "@/lib/utils";
import {
  BanknoteArrowDown,
  CircleDollarSign,
  House,
  LogOut,
  Receipt,
  UserPlus,
} from "lucide-react";
import { signOut } from "next-auth/react";
import IconButton from "./icon-button";
import { H4 } from "./typography";

type ActionType = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export default function Sidebar() {
  const actions: ActionType[] = [
    {
      label: "Contas",
      icon: <UserPlus size={30} />,
      onClick: () => handleAccountsRedirect(),
    },
    {
      label: "Transações",
      icon: <BanknoteArrowDown size={30} />,
      onClick: () => handleTransactionsRedirect(),
    },
    {
      label: "Extrato",
      icon: <Receipt size={30} />,
      onClick: () => handleStatementRedirect(),
    },
    {
      label: "Home",
      icon: <House size={30} />,
      onClick: () => handleHomeRedirect(),
    },
  ];

  return (
    <div
      suppressHydrationWarning
      className="flex flex-col h-screen bg-org-d-green w-auto"
    >
      <div className="flex items-center justify-center pt-8">
        <CircleDollarSign
          size={150}
          strokeWidth={1}
          className="stroke-org-d-pessego"
        />
      </div>
      <nav className="flex flex-col p-4 flex-grow gap-2">
        {actions.map((action) => (
          <IconButton
            key={action.label}
            icon={action.icon}
            label={
              <H4 className="text-org-d-pessego font-semibold">
                {action.label}
              </H4>
            }
            onClick={action.onClick}
          />
        ))}
      </nav>
      <nav className="flex flex-col pb-20 pl-4 p-4">
        <IconButton
          icon={<LogOut size={30} />}
          label={<H4 className="text-org-d-pessego font-semibold">Sair</H4>}
          onClick={() => signOut()}
        />
      </nav>
    </div>
  );
}
