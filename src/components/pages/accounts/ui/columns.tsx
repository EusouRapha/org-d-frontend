"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Account = {
  accountNumber: string;
  balance: number;
};

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "accountNumber",
    header: "Numero da conta",

    cell: ({ row }) => {
      const accountNumber = row.getValue<string>("accountNumber");

      return <div className="font-medium">{accountNumber}</div>;
    },
  },
  {
    accessorKey: "balance",
    header: () => <div className="text-right">Saldo</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("balance"));
      const formatted = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
