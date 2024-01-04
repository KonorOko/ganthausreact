import { Navigation } from "../../../components/Navigation";
import { TenenciasFormPage } from "./TenenciasFormPage";

import React from "react";

export function EditTenencias() {
  return (
    <div className="md:ml-16">
      <Navigation />
      <div className="my-2 md:px-5 py-2 bg-slate-50 min-h-screen">
        <div className="rounded-md bg-white shadow-md mb-3 p-1">
          <h1 className="p-2 w-10/12 font-bold text-3xl">Edita el registro</h1>
        </div>
        <div className="border rounded-md shadow-md mb-3 bg-white">
          <TenenciasFormPage link={"/admin/vehiculos/tenencias/"} />
        </div>
      </div>
    </div>
  );
}
