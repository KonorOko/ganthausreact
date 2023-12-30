import { Navigation } from "../../../components/Navigation";
import { useState } from "react";
import { VehiculosFormPage } from "../modificar/VehiculosFormPage";
import { VehiculosTable } from "../modificar/VehiculosTable";

export function DataPageVehiculos() {
  const [actualizar, setActualizar] = useState(false);
  return (
    <div className="md:ml-16">
      <Navigation />
      <div className="my-2 md:mx-10 md:px-5 py-2 border rounded-md min-h-screen bg-slate-50">
        <div className="rounded-md bg-white shadow-md mb-3 p-1">
          <h1 className="p-2 w-10/12 font-bold text-3xl">Vehículos</h1>
        </div>
        <div className="border rounded-md shadow-md mb-3 bg-white">
          <VehiculosFormPage setActualizar={setActualizar} actualizar={actualizar}/>
        </div>
        <div className="border rounded-md shadow-md bg-white">
          <VehiculosTable actualizar={actualizar} />
        </div>
      </div>
    </div>
  );
}
