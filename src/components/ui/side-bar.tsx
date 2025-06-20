"use client";

import {
  handleAccountsRedirect,
  handleHomeRedirect,
  handleProfileRedirect,
  handleStatementRedirect,
  handleTransactionsRedirect,
} from "@/lib/utils";
import {
  BanknoteArrowDown,
  CircleDollarSign,
  House,
  LogOut,
  Receipt,
  UserCog,
  UserPlus,
} from "lucide-react";
import { signOut } from "next-auth/react";
import IconButton from "./icon-button";

type ActionType = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export default function Sidebar() {
  const topActions: ActionType[] = [
    {
      label: "Home",
      icon: (
        <House
          size={30}
          className="max-[768px]:w-6 max-[768px]:h-6 max-[768px]:ml-1"
        />
      ),
      onClick: () => handleHomeRedirect(),
    },
    {
      label: "Contas",
      icon: (
        <UserPlus
          size={30}
          className="max-[768px]:w-6 max-[768px]:h-6 max-[768px]:ml-1"
        />
      ),
      onClick: () => handleAccountsRedirect(),
    },
    {
      label: "Transações",
      icon: (
        <BanknoteArrowDown
          size={30}
          className="max-[768px]:w-6 max-[768px]:h-6 max-[768px]:ml-1"
        />
      ),
      onClick: () => handleTransactionsRedirect(),
    },
    {
      label: "Extrato",
      icon: (
        <Receipt
          size={30}
          className="max-[768px]:w-6 max-[768px]:h-6 max-[768px]:ml-1"
        />
      ),
      onClick: () => handleStatementRedirect(),
    },
  ];

  const downActions: ActionType[] = [
    {
      label: "Perfil",
      icon: (
        <UserCog
          size={30}
          className="max-[768px]:w-6 max-[768px]:h-6 max-[768px]:ml-1"
        />
      ),
      onClick: () => handleProfileRedirect(),
    },
    {
      label: "Sair",
      icon: (
        <LogOut
          size={30}
          className="max-[768px]:w-6 max-[768px]:h-6 max-[768px]:ml-1"
        />
      ),
      onClick: () => signOut(),
    },
  ];

  return (
    <div
      suppressHydrationWarning
      className="flex flex-col h-screen bg-org-d-green w-auto max-[768px]:w-20 max-[375px]:w-16"
    >
      <div className="flex items-center justify-center pt-8 max-[768px]:pt-4">
        <CircleDollarSign
          size={150}
          strokeWidth={1}
          className="stroke-org-d-pessego max-[768px]:w-12  max-[768px]:h-12 max-[375px]:w-10 max-[375px]:h-10"
        />
      </div>
      <nav
        suppressHydrationWarning
        className="flex flex-col p-4 flex-grow gap-2 max-[768px]:p-2 max-[375px]:p-1"
      >
        {topActions.map((action) => (
          <IconButton
            key={action.label}
            icon={action.icon}
            label={
              <span className="text-org-d-pessego font-semibold text-xl max-[768px]:hidden ">
                {action.label}
              </span>
            }
            onClick={action.onClick}
          />
        ))}
      </nav>
      <nav className="flex flex-col pb-20 pl-4 p-4 max-[768px]:pb-10 max-[768px]:pl-2 max-[375px]:pb-8 max-[375px]:pl-1">
        {downActions.map((action) => (
          <IconButton
            key={action.label}
            icon={action.icon}
            label={
              <span className="text-org-d-pessego font-semibold text-xl max-[768px]:hidden ">
                {action.label}
              </span>
            }
            onClick={action.onClick}
          />
        ))}
      </nav>
    </div>
  );
}
