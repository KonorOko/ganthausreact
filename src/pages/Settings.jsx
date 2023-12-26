import { useEffect, useState } from "react";
import axios from "axios";

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
      }
    })();
  }, []);
  return <div></div>;
};

export default function Settings() {
  return (
    <div className="flex col justify-center h-screen items-center bg-white">
      <div className="text-center border rounded-md bg-slate-50 w-64 h-72 flex col justify-center items-center">
        <ul>
          <li>
            <h1 className="text-lg font-bold mb-5">
              Configuración
            </h1>
          </li>
          <li>
        <a href="/logout">
          <button className="bg-blue-50 border rounded-md w-24 my-1">Logout</button>
        </a>
          </li>
          <li>
          <a href="/">
          <button className="bg-blue-50 border rounded-md w-24 my-1">Home</button>
        </a>
          </li>

        </ul>
      </div>
    </div>
  );
}
