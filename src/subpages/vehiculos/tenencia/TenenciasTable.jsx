import { SimpleTable } from "../../../components/SimpleTable";
import { useEffect, useState } from "react";
import { getAllTenencias } from "../../../api/admin.api";

export function TenenciasTable({ actualizar }) {
  const [Tenencias, setTenencias] = useState([{
    id: "...",
    vehiculo: "...",
    fecha: "...",
  }]);
  useEffect(() => {
    async function loadTenencias() {
      const res = await getAllTenencias();
      setTenencias(res.data.reverse());
    }
    loadTenencias();
  }, [actualizar]);

  const columns = [
    {
      header: "Vehículo",
      accessorKey: "vehiculo",
    },
    {
      header: "Fecha",
      accessorKey: "fecha",
    },
  ];
  return (
    <div>
      <SimpleTable
        data={Tenencias}
        columns={columns}
        search={true}
        download={true}
        buttonsPagination={true}
        editable={true}
        link={"/admin/vehiculos/Tenencias/"}
      />
    </div>
  );
}
