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
          className="max-[768px]:w-6 max-[768px]:h-6 max-[768px]:ml-1 max-[320px]:w-4 max-[320px]:h-4 max-[320px]:ml-0"
        />
      ),
      onClick: () => handleHomeRedirect(),
    },
    {
      label: "Contas",
      icon: (
        <UserPlus
          size={30}
          className="max-[768px]:w-6 max-[768px]:h-6 max-[768px]:ml-1 max-[320px]:w-4 max-[320px]:h-4 max-[320px]:ml-0"
        />
      ),
      onClick: () => handleAccountsRedirect(),
    },
    {
      label: "Transações",
      icon: (
        <BanknoteArrowDown
          size={30}
          className="max-[768px]:w-6 max-[768px]:h-6 max-[768px]:ml-1 max-[320px]:w-4 max-[320px]:h-4 max-[320px]:ml-0"
        />
      ),
      onClick: () => handleTransactionsRedirect(),
    },
    {
      label: "Extrato",
      icon: (
        <Receipt
          size={30}
          className="max-[768px]:w-6 max-[768px]:h-6 max-[768px]:ml-1 max-[320px]:w-4 max-[320px]:h-4 max-[320px]:ml-0"
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
          className="max-[768px]:w-6 max-[768px]:h-6 max-[768px]:ml-1 max-[320px]:w-4 max-[320px]:h-4 max-[320px]:ml-0"
        />
      ),
      onClick: () => handleProfileRedirect(),
    },
    {
      label: "Sair",
      icon: (
        <LogOut
          size={30}
          className="max-[768px]:w-6 max-[768px]:h-6 max-[768px]:ml-1 max-[320px]:w-4 max-[320px]:h-4 max-[320px]:ml-0"
        />
      ),
      onClick: () => signOut(),
    },
  ];

  return (
    <div
      suppressHydrationWarning
      className="fixed flex flex-col bg-org-d-green h-screen w-[200px] max-[768px]:w-20 max-[375px]:w-16 max-[320px]:w-14 z-10"
    >
      <div
        suppressHydrationWarning
        className="flex items-center justify-center pt-8 max-[768px]:pt-4 max-[320px]:pt-2"
      >
        <CircleDollarSign
          suppressHydrationWarning
          size={150}
          strokeWidth={1}
          className="stroke-org-d-pessego max-[768px]:w-12 max-[768px]:h-12 max-[375px]:w-10 max-[375px]:h-10 max-[320px]:w-8 max-[320px]:h-8"
        />
      </div>
      <nav
        suppressHydrationWarning
        className="flex flex-col p-4 flex-grow gap-2 max-[768px]:p-2 max-[375px]:p-1 max-[320px]:p-0.5"
      >
        {topActions.map((action) => (
          <IconButton
            key={action.label}
            icon={action.icon}
            label={
              <span
                className="text-org-d-pessego font-semibold text-xl max-[768px]:hidden"
                suppressHydrationWarning
              >
                {action.label}
              </span>
            }
            onClick={action.onClick}
          />
        ))}
      </nav>
      <nav className="flex flex-col pb-20 pl-4 p-4 max-[768px]:pb-10 max-[768px]:pl-2 max-[375px]:pb-8 max-[375px]:pl-1 max-[320px]:pb-6 max-[320px]:pl-0.5">
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
