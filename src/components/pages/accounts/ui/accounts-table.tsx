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
      <div className="flex items-center py-4 max-[768px]:flex-col max-[768px]:gap-2 ">
        <Input
          placeholder="Busque por numeros da conta"
          value={
            (table.getColumn("account_number")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) => {
            table
              .getColumn("account_number")
              ?.setFilterValue(event.target.value);

            setPagination((prev) => ({
              ...prev,
              pageIndex: 0,
            }));
          }}
          className="max-w-sm max-[768px]:w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <Table className="rounded-md border min-w-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center text-sm max-[768px]:text-xs"
                    >
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
                  className="text-center text-sm max-[768px]:text-xs"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
                    <Skeleton className="w-[200px] h-[20px] bg-green-800 max-[768px]:w-[200px] max-[375px]:w-[200px]" />
                  ) : (
                    <span className="text-sm text-gray-500 max-[768px]:text-xs">
                      Nenhum resultado encontrado
                    </span>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 max-[768px]:flex-col max-[768px]:space-x-0 max-[768px]:gap-2">
        <Pagination
          table={table}
          handleChangePageIndex={handleChangePageIndex}
        />
      </div>
    </>
  );
}
