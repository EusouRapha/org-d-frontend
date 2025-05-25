"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import Pagination from "./pagination";
import { useGetAccountQuery } from "../hooks/use-accounts-queries";
import { Account } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps<TValue> {
  columns: ColumnDef<Account, TValue>[];
  clientId: number;
}

export function DataTable<TValue>({
  columns,
  clientId,
}: DataTableProps<TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const getAccountsQuery = useGetAccountQuery(clientId);

  const table = useReactTable({
    data: getAccountsQuery.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Busque por numeros da conta"
          value={
            (table.getColumn("accountNumber")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("accountNumber")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <Table className="rounded-md border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="text-center"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="flex justify-center items-center text-center"
              >
                {getAccountsQuery.isLoading ? (
                  <Skeleton className="w-[400px] h-[20px]  bg-green-800" />
                ) : (
                  <span className="text-sm text-gray-500">
                    Nenhum resultado encontrado
                  </span>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2">
        <Pagination table={table} />
      </div>
    </>
  );
}
