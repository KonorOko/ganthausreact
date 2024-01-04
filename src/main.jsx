import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
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
import { DataTenenciasPage } from './subpages/vehiculos/tenencia/DataTenenciasPage';
import { EditTenencias } from './subpages/vehiculos/tenencia/EditTenencias';
import Settings, { Logout } from "./pages/Settings";
import { DataServiciosPage } from "./subpages/vehiculos/servicio/DataServiciosPage";
import { EditServicios } from "./subpages/vehiculos/servicio/EditServicios";
import Main from "./pages/DashboardPage";
import "./interceptor/axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarMain />,
    children: [
      {
        path: "/",
        element: <Navigate to="admin/" />,
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
        path: "admin/vehiculos/tenencias",
        element: <DataTenenciasPage />,
      },
      {
        path: "admin/vehiculos/:id",
        element: <EditVehiculos />,
      },
      {
        path: "admin/vehiculos/verificaciones/:id",
        element: <EditVerificaciones />,
      },
      {
        path: "admin/vehiculos/tenencias/:id",
        element: <EditTenencias />,
      },
      {
        path: "admin/vehiculos/servicios",
        element: <DataServiciosPage />,
      },
      {
        path: "admin/vehiculos/servicios/:id",
        element: <EditServicios />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/admin" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
