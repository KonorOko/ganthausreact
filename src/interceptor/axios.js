import axios from "axios";
import { Navigate } from "react-router-dom";

let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("---Intercepted---");

    if (error.response.status === 401 && !refreshPromise) {
      console.log("---Refreshing---");

      // Crear una nueva promesa para la renovación del token
      refreshPromise = refreshToken();

      try {
        const response = await refreshPromise;

        // Reintentar todas las solicitudes en espera con el nuevo token
        retryPendingRequests(response.data.access);
      } catch (err) {
        console.log("Error refreshing token");
        // Redirigir o manejar de manera adecuada la situación de error al renovar el token
        Navigate("/logout");
        throw new Error("Ha ocurrido un error:", err);
      } finally {
        refreshPromise = null;
      }
    } else if (error.response.status === 401 && refreshPromise) {
      // Si ya hay una promesa en curso, espera a que se resuelva
      await refreshPromise;
      // Reintentar la solicitud original después de renovar el token
      return axios(error.config);
    }

    console.log("Not Refreshing");
    return Promise.reject(error);
  }
);

async function refreshToken() {
  const refreshToken = localStorage.getItem('refresh_token');

  const response = await axios.post(
    'https://ganthausdjango.onrender.com/token/refresh/',
    {
      refresh: refreshToken,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );

  if (response.status === 200) {
    console.log("---Refresh---");
    console.log(response.data);
    localStorage.clear();
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
    console.log("Refresh exitoso");
    return response;
  }
}

function retryPendingRequests(newToken) {
  // Obtener y actualizar todas las solicitudes en espera con el nuevo token
  const requests = pendingRequests;
  pendingRequests = [];

  requests.forEach((request) => {
    request.headers['Authorization'] = `Bearer ${newToken}`;
    axios(request);
  });
}

let pendingRequests = [];
axios.interceptors.request.use(
  (config) => {
    // Agregar las solicitudes en espera a la lista
    pendingRequests.push(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
