"use client";

import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  CircleDollarSign,
  House,
  LogOut,
  Receipt,
  UserPlus,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { H3 } from "./typography";
import {
  handleAccountsRedirect,
  handleDepositRedirect,
  handleHomeRedirect,
  handleStatementRedirect,
  handleWithdrawRedirect,
} from "@/lib/utils";

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
      label: "Saque",
      icon: <BanknoteArrowDown size={30} />,
      onClick: () => handleWithdrawRedirect(),
    },
    {
      label: "Deposito",
      icon: <BanknoteArrowUp size={30} />,
      onClick: () => handleDepositRedirect(),
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
      className="flex flex-col h-screen bg-org-d-green w-52"
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
          <div
            key={action.label}
            role="button"
            className="flex flex-row text-org-d-pessego rounded-2xl hover:bg-green-950 hover:text-org-d-pessego px-4 py-2 cursor-pointer items-center transition duration-300 ease-in-out"
            onClick={action.onClick}
          >
            {action.icon}
            <H3 className="text-org-d-pessego font-semibold pl-2">
              {action.label}
            </H3>
          </div>
        ))}
      </nav>
      <nav className="flex flex-col pb-20 pl-4 p-4">
        <div
          role="button"
          className="flex flex-row text-org-d-pessego rounded-2xl hover:bg-green-950 hover:text-org-d-pessego px-4 py-2 cursor-pointer items-center transition duration-300 ease-in-out"
          onClick={() => signOut()}
        >
          <LogOut size={30} />
          <H3 className="text-org-d-pessego font-semibold pl-2">Sair</H3>
        </div>
      </nav>
    </div>
  );
}
