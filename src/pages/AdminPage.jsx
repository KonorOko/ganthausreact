import { useState, useEffect } from "react";
import { Metrics } from "../components/ui/Metrics";
import {
  getBalanceTotal,
  getUltimosMovimientos,
  getFirstVerificaciones,
} from "../api/admin.api";
import { SimpleTable } from "../components/SimpleTable";
import { Tabs } from "../components/ui/Tabs";
import { Navigation } from "../components/Navigation";

export function MainPage() {
  const [ultimosMovimientos, setUltimosMovimientos] = useState([
    { id: "...", cantidad: "...", motivo: "...", fecha: "..." },
  ]);
  const [movimientos, setMovimientos] = useState([
    { cantidad: 0, movimientos: 0 },
  ]);
  useEffect(() => {
    async function loadMovimientos() {
      const res = await getUltimosMovimientos();
      setUltimosMovimientos(res.data.reverse());
    }
    loadMovimientos();
  }, []);
  useEffect(() => {
    async function loadMovimientos() {
      const res = await getBalanceTotal();
      setMovimientos(res.data);
    }
    loadMovimientos();
  }, []);
  const [tab, setTab] = useState("Caja Chica");
  const [firstVerificaciones, setFirstVerificaciones] = useState([
    { id: "...", vehiculo: "...", fecha: "..." },
  ]);

  useEffect(() => {
    async function loadFirstVerificaciones() {
      const res = await getFirstVerificaciones();
      setFirstVerificaciones(res.data);
    }
    loadFirstVerificaciones();
  }, []);
  
  const columnsFirstVerificaciones = [
    {
      header: "Vehículo",
      accessorKey: "vehiculo",
    },
    {
      header: "Fecha",
      accessorKey: "fecha",
    },
  ];

  const columnsCajaChica = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Cantidad",
      accessorKey: "cantidad",
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
  function cajaChicaTab() {
    return (
      <div className="py-2">
        <h2 className="text-center font-bold text-2xl mt-1 mb-2">Caja Chica</h2>
        <div className="flex flex-row justify-evenly">
          <Metrics valor={movimientos[0].cantidad} name="Balance Total" />
          <Metrics valor={movimientos[0].movimientos} name="Movimientos" />
        </div>
        <div>
          <div className="text-center font-medium pb-0 mb-0 mt-2">
            Últimos movimientos
          </div>
          <div className="border rounded-md shadow-md m-3">
            <SimpleTable data={ultimosMovimientos} columns={columnsCajaChica} />
          </div>
        </div>
      </div>
    );
  }

  function vehiculosTab() {
    return (
      <div className="py-2">
        <h2 className="text-center font-bold text-2xl mt-1 mb-2">Vehículos</h2>
        <div className="flex flex-row justify-evenly">Work in progress...</div>
        <div>
        <div className="text-center font-medium pb-0 mb-0 mt-2">
            Verificaciones próximas
          </div>

        <div className="border rounded-md shadow-md m-3">
          <SimpleTable data={firstVerificaciones} columns={columnsFirstVerificaciones} />
        </div>
        </div>
      </div>
    );
  }

  function currentTab() {
    switch (tab) {
      case "Caja Chica":
        return cajaChicaTab();
      case "Vehículos":
        return vehiculosTab();
      default:
        return <div>...</div>;
    }
  }
  let names = ["Caja Chica", "Vehículos"];

  return (
    <div className="md:ml-16">
      <Navigation />
      <div className="my-2 md:px-5 py-2 rounded-md min-h-screen">
        <div className="rounded-md bg-white shadow-md mb-2 p-1">
          <h1 className="p-2 w-10/12 font-bold text-3xl">Overview</h1>
        </div>
        <div className="bg-white mt-5 rounded-md border shadow-md">
          <div className="text-md font-medium text-center text-gray-500 border-b border-gray-200 bg-white">
            <Tabs names={names} tab={tab} setTab={setTab} />
          </div>
          {currentTab()}
        </div>
      </div>
    </div>
  );
}
