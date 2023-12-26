import { useEffect, useState } from "react";
import {
  getBalance,
  getGasolina,
  getAnalisis,
  getTransacciones,
  getApoyos,
} from "../../../api/taks.api";
import { ChartLine } from "../../../components/ChartLine";
import { ChartBar } from "../../../components/ChartBar";
import { ChartPie } from "../../../components/ChartPie";
import { Tabs } from "../../../components/ui/Tabs";
import { Metrics } from "../../../components/ui/Metrics";
import { Navigation } from "../../../components/Navigation";

export function Analisis() {
  const [balanceTotal, setBalanceTotal] = useState([[]]);
  useEffect(() => {
    async function loadMovimientos() {
      const resBalance = await getBalance();
      setBalanceTotal(resBalance.data);
    }
    loadMovimientos();
  }, []);

  const [gasolina, setGasolina] = useState([]);
  useEffect(() => {
    async function loadGasolina() {
      const resGasolina = await getGasolina();
      setGasolina(resGasolina.data);
    }
    loadGasolina();
  }, []);

  const [transacciones, setTransacciones] = useState([]);
  useEffect(() => {
    async function loadTransaccion() {
      const resTransacciones = await getTransacciones();
      setTransacciones(resTransacciones.data);
      console.log(resTransacciones.data);
    }
    loadTransaccion();
  }, []);

  const [apoyos, setApoyos] = useState([]);
  useEffect(() => {
    async function loadApoyos() {
      const resApoyos = await getApoyos();
      setApoyos(resApoyos.data);
    }
    loadApoyos();
  }, []);

  const [datos, setDatos] = useState([
    { motivo: "gasolina", cantidad_total: 0 },
    { motivo: "apoyos", cantidad_total: 0 },
    { motivo: "transaccion", cantidad_total: 0 },
    { motivo: "otros", cantidad_total: 0 },
  ]);
  useEffect(() => {
    async function loadDatos() {
      const resDatos = await getAnalisis();
      setDatos(resDatos.data);
    }
    loadDatos();
  }, []);
  const [tab, setTab] = useState("Gasolina");
  let names = ["Gasolina", "Transacciones", "Apoyos", "Otros"];

  function gasolinaTab() {
    return (
      <div>
        <h2 className="text-lg text-center font-bold">Gasolina</h2>
        <p className="m-4">
          Los cálculos y análisis serán realizados con base en los registros del
          mes actual.
        </p>
        <br />
        <ChartBar data={gasolina} height={400} />
      </div>
    );
  }

  function transaccionesTab() {
    return (
      <div>
        <h2 className="text-lg text-center font-bold">Transacciones</h2>
        <p className="m-4">
          Los cálculos y análisis serán realizados con base en los registros del
          mes actual.
          <br />
          <b>
            Nota: Por transacciones se toman tanto los depósitos como
            tranferencias realizados.
          </b>
        </p>
        <ChartBar data={transacciones} height={400} />
      </div>
    );
  }

  function apoyosTab() {
    return (
      <div>
        <h2 className="text-lg text-center font-bold">Apoyos</h2>
        <p className="m-4">
          Los cálculos y análisis serán realizados con base en los registros del
          mes actual.
        </p>
        <br />
        <ChartBar data={apoyos} height={400} />
      </div>
    );
  }

  function currentTab() {
    switch (tab) {
      case "Gasolina":
        return gasolinaTab();
      case "Transacciones":
        return transaccionesTab();
      case "Apoyos":
        return apoyosTab();
      default:
        return null;
    }
  }

  return (
    <div className="ml-16">
      <Navigation />
      <div className="my-2 mx-10 px-5 py-2 rounded-md min-h-scree">
        <div className="rounded-md bg-white shadow-md mb-2 p-1">
          <h1 className="p-2 w-10/12 font-bold text-3xl">
            Análisis de movimientos
          </h1>
        </div>
        <div className="bg-white border rounded-md shadow-md px-2 py-3 mb-3">
          <h2 className="text-lg text-center font-bold">
            Balance Total vs Tiempo
          </h2>
          <div className="px-5">
            <ChartLine data={balanceTotal} height={300} />
          </div>
        </div>
        <div className="w-2/3 border rounded-md mx-auto mb-3 shadow-md bg-white p-3">
          <h2 className="text-center font-bold text-lg pt-3">
            Egresos del mes
          </h2>
          <div className="flex flex-auto justify-evenly mb-3 mt-3 border-t pt-3">
            <Metrics
              valor={`$ ${datos[0]["cantidad_total"]}`}
              name="Gasolina"
            />
            <Metrics
              valor={`$ ${datos[1]["cantidad_total"]}`}
              name="Transacción"
            />
            <Metrics valor={`$ ${datos[2]["cantidad_total"]}`} name="Apoyos" />
            <Metrics valor={`$ ${datos[3]["cantidad_total"]}`} name="Otros" />
          </div>
          <div className="border-t">
            <ChartPie
              dataKey="cantidad_total"
              nameKey="motivo"
              data={datos}
              height={300}
            />
          </div>
        </div>
        <div className="border rounded-md p-3 mb-3 shadow-md bg-white">
          <Tabs names={names} tab={tab} setTab={setTab} />
          <div className="mt-2">{currentTab()}</div>
        </div>
      </div>
    </div>
  );
}
