import { MovList } from "./MovList";
import { MovFormPage } from "./MovFormPage";
import { useState } from "react";
import { Navigation } from "../../../components/Navigation";

export function DataPage() {
  const [actualizar, setActualizar] = useState(false);
  return (
    <div className="md:ml-16">
      <Navigation />
      <div className="my-2 md:px-5 py-2 min-h-screen bg-slate-50">
        <div className="rounded-md bg-white shadow-md mb-3 p-1">
          <h1 className="p-2 w-10/12 font-bold text-3xl">Caja Chica</h1>
        </div>
        <div className="border rounded-md shadow-md mb-3 bg-white">
          <MovFormPage setActualizar={setActualizar} actualizar={actualizar} />
        </div>
        <div className="border rounded-md shadow-md bg-white">
          <MovList actualizar={actualizar} />
        </div>
      </div>
    </div>
  );
}
