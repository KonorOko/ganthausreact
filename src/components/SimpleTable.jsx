import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export function SimpleTable({
  data,
  columns,
  search,
  download,
  buttonsPagination,
  editable,
  link
}) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  return (
    <div className="p-2 mx-auto mt-2 rounded-md">
      {download && (
        <button className="sm:mx-1 rounded-md p-0 ps-0 float-left border text-base my-0 w-full sm:w-52 hover:bg-blue-50 mt-1 h-7">
          Descargar
        </button>
      )}
      {search && (
        <input
          className="p-0 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-full sm:w-80 bg-gray-5 focus:border-blue-200 float-right my-1 sm:mx-1 hover:bg-blue-50"
          type="text"
          placeholder="Buscar"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      )}
      <table className="w-full text-base text-left rtl:text-right text-gray-500 border border-collapse table-fixed">
        <thead className="text-gray-900 uppercase bg-blue-200 font-medium">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="capitalize px-3.5 py-2 border cursor-crosshair"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div>
                    {header.column.columnDef.header}
                    {
                      { asc: "↑", desc: "↓" }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map((row, i) => (
            <tr
              onClick={() => {
                editable ? navigate(`${link}${row.original.id}`) : null;
              }}
              key={row.id}
              className={`border-blue-400
              ${
                editable
                  ? "hover:font-bold hover:text-black cursor-pointer hover:border-2 "
                  : null
              }
            ${i % 2 === 0 ? "bg-white" : "bg-blue-50"}
            `}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3.5 py-2 border border-white">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {buttonsPagination && (
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-sm hover:bg-blue-50"
            onClick={() => table.setPageIndex(0)}
          >
            Primer Página
          </button>
          <button
            className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200  hover:bg-blue-50"
            onClick={() => table.previousPage()}
          >
            Página Anterior
          </button>
          <button
            className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-blue-50"
            onClick={() => {
              table.getCanNextPage() === true ? table.nextPage() : null;
            }}
          >
            Página Siguiente
          </button>
          <button
            className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-sm hover:bg-blue-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Última Página
          </button>
        </div>
      )}
    </div>
  );
}

SimpleTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};
