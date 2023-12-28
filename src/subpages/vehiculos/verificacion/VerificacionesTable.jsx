import { SimpleTable } from "../../../components/SimpleTable";
import { useEffect, useState } from "react";
import { getAllVerificaciones } from "../../../api/admin.api";

export function VerificacionesTable({ actualizar }) {
  const [verificaciones, setVerificaciones] = useState([]);
  useEffect(() => {
    async function loadVerificaciones() {
      const res = await getAllVerificaciones();
      setVerificaciones(res.data.reverse());
    }
    loadVerificaciones();
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
        data={verificaciones}
        columns={columns}
        search={true}
        download={true}
        buttonsPagination={true}
        editable={true}
        link={"/admin/vehiculos/verificaciones/"}
      />
    </div>
  );
}
