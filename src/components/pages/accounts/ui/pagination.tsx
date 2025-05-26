"use client";

import { Table } from "@tanstack/react-table";

type PaginationProps<TData> = {
  table: Table<TData>;
  handleChangePageIndex: (pageIndex: number) => void;
};

export default function Pagination<TData>({
  table,
  handleChangePageIndex,
}: PaginationProps<TData>) {
  return (
    <>
      <div>
        <div className="flex items-center justify-between py-4 gap-4">
          <div className="text-sm text-gray-600">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>
          <div className="text-sm text-gray-600">
            Total de registros: {table.getFilteredRowModel().rows.length}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <button
          className={`${
            !table.getCanPreviousPage()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-org-d-green hover:bg-green-800"
          } text-white rounded-xl py-1 text-center shadow-lg transition-all w-20`}
          onClick={() => {
            handleChangePageIndex(table.getState().pagination.pageIndex - 1);
          }}
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
          onClick={() => {
            handleChangePageIndex(table.getState().pagination.pageIndex + 1);
          }}
          disabled={!table.getCanNextPage()}
        >
          <div className="font-bold leading-tight">Proxima</div>
        </button>
      </div>
    </>
  );
}
