import { useEffect, useState } from "react";
import axios from "axios";
import { Tabs } from '../components/ui/Tabs';
import { Navigation } from '../components/Navigation';

export const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/logout/",
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          { withCredentials: true }
        );
        axios.post(
          "http://localhost:8000/logout/",
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          { withCredentials: true }
        );
        localStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        console.log("logout working");
        window.location.href = "/login";
      } catch (e) {
        axios.post(
          "http://localhost:8000/logout/",
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          { withCredentials: true }
        );
        console.error("Error during logout:", e);
        console.log("logout not working");
        window.location.href = "/login";
      }
    })();
  }, []);
  return <div></div>;
};

export default function Settings() {
  const [tab, setTab] = useState("General");

  function generalTab() {
    return (
      <div>
        <ul>
          <li>
            <label>Salir de la sesión</label>
            <a href="/logout">
              <button className="bg-blue-50 border rounded-md w-24 my-1">Logout</button>
            </a>
          </li>
          <li>
            <label>Ir al inicio</label>
            <a href="/">
              <button className="bg-blue-50 border rounded-md w-24 my-1">Home</button>
            </a>
          </li>
        </ul>
      </div>
    )
  }

  function currentTab() {
    switch (tab) {
      case "General":
        return generalTab();
      default:
        return <div>...</div>;
    }
  }
  let names = ["General",];
  return (
    <div className="min-h-screen bg-slate-50 md:ml-16">
      <div className="md:px-5">
        <h1 className="text-lg font-bold mb-5">
          Configuración
        </h1>
        <div className="text-md font-medium text-center text-gray-500 border-b border-gray-200 bg-white">
          <Tabs names={names} tab={tab} setTab={setTab} />
        </div>
        <div className="px-2">
          {currentTab()}
        </div>
      </div>
    </div>
  );
}
