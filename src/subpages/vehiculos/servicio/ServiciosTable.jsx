import { SimpleTable } from "../../../components/SimpleTable";
import { useEffect, useState } from "react";
import { getAllServicios } from "../../../api/admin.api";

export function ServiciosTable({ actualizar }) {
  const [Servicios, setServicios] = useState([{
    id: "...",
    vehiculo: "...",
    fecha: "...",
  }]);
  useEffect(() => {
    async function loadServicios() {
      const res = await getAllServicios();
      setServicios(res.data.reverse());
    }
    loadServicios();
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
        data={Servicios}
        columns={columns}
        search={true}
        download={true}
        buttonsPagination={true}
        editable={true}
        link={"/admin/vehiculos/servicios/"}
      />
    </div>
  );
}
