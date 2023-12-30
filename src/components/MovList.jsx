import { SimpleTable } from "./SimpleTable";
import { useEffect, useState } from "react";
import { getAllMovimientos } from "../api/admin.api";

export function MovList({ actualizar }) {
  const [movimientos, setMovimientos] = useState([{
    id: "...",
    cantidad: "...",
    motivo: "...",
    fecha: "...",
  }]);
  useEffect(() => {
    async function loadMovimientos() {
      const res = await getAllMovimientos();
      setMovimientos(res.data.reverse());
    }
    loadMovimientos();
  }, [actualizar]);

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Cantidad",
      accessorKey: "cantidad",
      /*
      accessorFn: row => new Intl.NumberFormat("eu-US", {
        maximumFractionDigits: 3,
      }).format(row.cantidad)
      */
    },
    {
      header: "Motivo",
      accessorKey: "motivo",
    },
    {
      header: "Fecha",
      accessorKey: "fecha",
    },
  ];
  return (
    <div>
      <SimpleTable
        data={movimientos}
        columns={columns}
        search={true}
        download={true}
        buttonsPagination={true}
        editable={true}
        link={"/admin/cajachica/"}
      />
    </div>
  );
}
