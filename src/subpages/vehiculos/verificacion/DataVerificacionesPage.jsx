import { Navigation } from "../../../components/Navigation";
import { useState } from "react";
import { VerificacionesFormPage } from "../verificacion/VerificacionesFormPage";
import { VerificacionesTable } from "../verificacion/VerificacionesTable";

export function DataVerificacionesPage() {
  const [actualizar, setActualizar] = useState(false);
  return (
    <div className="md:ml-16 mb-20">
      <Navigation />
      <div className="my-2 md:px-5 py-2 min-h-screen bg-slate-50">
        <div className="rounded-md bg-white shadow-md mb-3 p-1">
          <h1 className="p-2 w-10/12 font-bold text-3xl">Verificaciones</h1>
        </div>
        <div className="border rounded-md shadow-md mb-3 bg-white">
          <VerificacionesFormPage
            setActualizar={setActualizar}
            actualizar={actualizar}
          />
        </div>
        <div className="border rounded-md shadow-md bg-white">
          <VerificacionesTable actualizar={actualizar} />
        </div>
      </div>
    </div>
  );
}
