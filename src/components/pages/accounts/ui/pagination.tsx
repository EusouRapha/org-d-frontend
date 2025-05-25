"use client";

import { Table } from "@tanstack/react-table";

type PaginationProps<TData> = {
  table: Table<TData>;
};

export default function Pagination<TData>({ table }: PaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <button
        className={`${
          !table.getCanPreviousPage()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-org-d-green hover:bg-green-800"
        } text-white rounded-xl py-1 text-center shadow-lg transition-all w-20`}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <div className="font-bold leading-tight">Anterior</div>
      </button>
      <button
        className={`${
          !table.getCanNextPage()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-org-d-green hover:bg-green-800"
        } text-white rounded-xl py-1 text-center shadow-lg transition-all w-20`}
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <div className="font-bold leading-tight">Proxima</div>
      </button>
    </div>
  );
}
