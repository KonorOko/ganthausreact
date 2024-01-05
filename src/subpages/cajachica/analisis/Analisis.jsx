import { useEffect, useState } from "react";
import {
  getBalance,
  getGasolina,
  getAnalisis,
  getTransacciones,
  getApoyos,
  getComisiones
} from "../../../api/admin.api";
import { ChartLine } from "../../../components/ChartLine";
import { ChartBar } from "../../../components/ChartBar";
import { ChartPie } from "../../../components/ChartPie";
import { Tabs } from "../../../components/ui/Tabs";
import { Metrics } from "../../../components/ui/Metrics";
import { Navigation } from "../../../components/Navigation";
import ToolTip from "../../../components/ui/ToolTip";

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
    }
    loadTransaccion();
  }, []);

  const [comisiones, setComisiones] = useState([]);
  useEffect(() => {
    async function loadComisiones() {
      const resComisiones = await getComisiones();
      setComisiones(resComisiones.data);
      console.log(resComisiones.data);
    }
    loadComisiones();
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
    { motivo: "gasolina", cantidad_total: "0.00" },
    { motivo: "apoyos", cantidad_total: "0.00" },
    { motivo: "comisiones", cantidad_total: "0.00" },
    { motivo: "transaccion", cantidad_total: "0.00" },
    { motivo: "otros", cantidad_total: "0.00" },
  ]);

  const [datosFloat, setDatosFloat] = useState([
    { motivo: "gasolina", cantidad_total: 0.0 },
    { motivo: "apoyos", cantidad_total: 0.0 },
    { motivo: "comisiones", cantidad_total: 0.0 },
    { motivo: "transaccion", cantidad_total: 0.0 },
    { motivo: "otros", cantidad_total: 0.0 },
  ]);

  useEffect(() => {
    async function loadDatos() {
      const resDatos = await getAnalisis();
      setDatos(resDatos.data);
    }
    loadDatos();
  }, []);

  useEffect(() => {
    function dataChartPie() {
      setDatosFloat(
        datos.map((dato) => ({
          ...dato,
          cantidad_total: parseFloat(dato.cantidad_total.replace(/,/g, "")),
        }))
      );
    }
    dataChartPie();
  }, [datos]);

  const [tab, setTab] = useState("Gasolina");
  let names = ["Gasolina", "Transacciones","Comisiones", "Apoyos"];

  function gasolinaTab() {
    return (
      <div>
        <h2 className="text-lg text-center font-bold">Gasolina</h2>
        <p className="md:m-4 text-justify">
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
        <p className="md:m-4 text-justify">
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

  function comisionesTab() {
    return (
      <div>
        <h2 className="text-lg text-center font-bold">Comisiones</h2>
        <p className="md:m-4 text-justify">
          Los cálculos y análisis serán realizados con base en los registros del
          mes actual.
        </p>
        <br />
        <ChartBar data={comisiones} height={400} />
      </div>
    );
  }

  function apoyosTab() {
    return (
      <div>
        <h2 className="text-lg text-center font-bold">Apoyos</h2>
        <p className="md:m-4 text-justify">
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
      case "Comisiones":
        return comisionesTab();
      case "Apoyos":
        return apoyosTab();
      default:
        return null;
    }
  }

  return (
    <div className="md:ml-16 pb-20">
      <Navigation />
      <div className="my-2 md:px-5 py-2 rounded-md min-h-screen bg-slate-50">
        <div className="rounded-md bg-white shadow-md mb-2 p-1">
          <h1 className="p-2 w-10/12 font-bold text-3xl">
            Análisis de movimientos
          </h1>
        </div>
        <div className="bg-white border rounded-md shadow-md md:px-2 py-3 mb-3">
          <h2 className="text-lg text-center font-bold">
            Balance Total vs Tiempo
          </h2>
          <div className="md:px-5">
            <ChartLine data={balanceTotal} height={300} />
          </div>
        </div>
        <div className="border rounded-md md:mx-auto mb-3 shadow-md bg-white py-3">
          <h2 className="text-center font-bold text-lg pt-3">
            Egresos del mes
          </h2>
          <div className="md:flex justify-evenly mb-3 mt-3 border-t pt-3 md:bg-blue-100">
            <Metrics
              valor={`$ ${datos[0]["cantidad_total"]}`}
              name="Gasolina"
              className={"md:w-36"}
            />
            <ToolTip message="Depositos y transferencias" className={"mt-2"}>
              <Metrics
                valor={`$ ${datos[1]["cantidad_total"]}`}
                name="Transacciones"
                className={"md:w-36"}
              />
            </ToolTip>
            <Metrics
              valor={`$ ${datos[3]["cantidad_total"]}`}
              name="Comisiones"
              className={"md:w-36"}
            />
            <Metrics
              valor={`$ ${datos[2]["cantidad_total"]}`}
              name="Apoyos"
              className={"md:w-36"}
            />
            <Metrics
              valor={`$ ${datos[4]["cantidad_total"]}`}
              name="Otros"
              className={"md:w-36"}
            />
          </div>
          <div className="border-t">
            <ChartPie
              dataKey="cantidad_total"
              nameKey="motivo"
              data={datosFloat}
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
