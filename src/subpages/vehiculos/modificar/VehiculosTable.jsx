import { SimpleTable } from "../../../components/SimpleTable";
import { useEffect, useState } from "react";
import { getAllVehiculos } from "../../../api/admin.api";

export function VehiculosTable({ actualizar }) {
  const [vehiculos, setVehiculos] = useState([{
    id: "...",
    modelo: "...",
    año: "...",
    placa: "...",
  }]);
  useEffect(() => {
    async function loadVehiculos() {
      const res = await getAllVehiculos();
      setVehiculos(res.data.reverse());
    }
    loadVehiculos();
  }, [actualizar]);

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Modelo",
      accessorKey: "modelo",
    },
    {
      header: "Año",
      accessorKey: "año",
    },
    {
      header: "Placa",
      accessorKey: "placa",
    },
  ];
  return (
    <div>
      <SimpleTable
        data={vehiculos}
        columns={columns}
        search={true}
        download={true}
        buttonsPagination={true}
        editable={true}
        link={"/admin/vehiculos/"}
      />
    </div>
  );
}
