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
import { useGetAccountsQuery } from "../hooks/use-accounts-queries";
import { Account } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps<TValue> {
  columns: ColumnDef<Account, TValue>[];
  clientId: number;
}

export function AccountsTable<TValue>({
  columns,
  clientId,
}: DataTableProps<TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const handleChangePageIndex = (pageIndex: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex,
    }));
  };

  const getAccountsQuery = useGetAccountsQuery(clientId);

  const table = useReactTable({
    data: getAccountsQuery.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    },
  });

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Busque por numeros da conta"
          value={
            (table.getColumn("account_number")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("account_number")
              ?.setFilterValue(event.target.value)
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
                {getAccountsQuery.isPending ? (
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
      <div className="flex items-center justify-between space-x-2">
        <Pagination
          table={table}
          handleChangePageIndex={handleChangePageIndex}
        />
      </div>
    </>
  );
}
