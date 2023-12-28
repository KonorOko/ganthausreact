import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Login } from "./App";
import { SidebarMain } from "./pages/SidebarMain";
import { MainPage } from "./pages/AdminPage";
import { EditMovement } from "./subpages/cajachica/modificar/EditMovement";
import { DataPage } from "./subpages/cajachica/modificar/DataPage";
import { Analisis } from "./subpages/cajachica/analisis/Analisis";
import { DataPageVehiculos } from "./subpages/vehiculos/modificar/DataPageVehiculos";
import { DataVerificacionesPage } from "./subpages/vehiculos/verificacion/DataVerificacionesPage";
import { EditVehiculos } from "./subpages/vehiculos/modificar/EditVehiculos";
import { EditVerificaciones } from "./subpages/vehiculos/verificacion/EditVerificaciones";
import Settings, { Logout } from "./pages/Settings";
import Main from "./pages/Main";
import "./interceptor/axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarMain />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "admin/",
        element: <MainPage />,
      },
      {
        path: "admin/cajachica/datapage/",
        element: <DataPage />,
      },
      {
        path: "admin/cajachica/:id",
        element: <EditMovement />,
      },
      {
        path: "admin/cajachica/analisis",
        element: <Analisis />,
      },
      {
        path: "admin/vehiculos/datapage/",
        element: <DataPageVehiculos />,
      },
      {
        path: "admin/vehiculos/verificaciones",
        element: <DataVerificacionesPage />,
      },
      {
        path: "admin/vehiculos/:id",
        element: <EditVehiculos />,
      },
      {
        path: "admin/vehiculos/verificaciones/:id",
        element: <EditVerificaciones />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not found</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-gray-200">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
