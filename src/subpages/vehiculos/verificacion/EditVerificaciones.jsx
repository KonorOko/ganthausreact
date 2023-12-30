import { Navigation } from "../../../components/Navigation";
import { VerificacionesFormPage } from "./VerificacionesFormPage";

import React from "react";

export function EditVerificaciones() {
  return (
    <div className="md:ml-16">
      <Navigation />
      <div className="my-2 md:mx-10 md:px-5 py-2 bg-slate-50 min-h-screen rounded-md border">
        <div className="rounded-md bg-white shadow-md mb-3 p-1">
          <h1 className="p-2 w-10/12 font-bold text-3xl">Edita el registro</h1>
        </div>
        <div className="border rounded-md shadow-md mb-3 bg-white">
          <VerificacionesFormPage link={"/admin/vehiculos/verificaciones/"} />
        </div>
      </div>
    </div>
  );
}
