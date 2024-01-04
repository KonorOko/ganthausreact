import axios from 'axios'
import api from '../interceptor/axios';

const server = "http://localhost:8000"

const production = "https://ganthausdjango.onrender.com"

const defaultApiCajaChica = `${server}/cajachica/api/v1/movimientos/`

const defaultApiVehiculos = `${server}/vehiculos/api/v1/vehiculos/`

const defaultApiVerificaciones = `${server}/vehiculos/api/v1/verificaciones/`

const defaultApiTenencias = `${server}/vehiculos/api/v1/tenencias/`

export const loginToken = (user) => axios.post(
    `${server}/token/`,
    user,
    {
        headers: {
            "Content-Type": "application/json",
        },
    },
    { withCredentials: true },
)
    .then((data) => {
        if (data.status === 200) {
            console.log("---Login---")
            localStorage.clear();
            localStorage.setItem("access_token", data.data.access);
            localStorage.setItem("refresh_token", data.data.refresh);
            localStorage.setItem("username", data.data.username)
            localStorage.setItem("role", data.data.groups[0])
            axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
            window.location.href = "/";
            console.log("Login exitoso")
        } else {
            throw new Error("Ha ocurrido un error");
        }
    }
    )

export const User = () => api.get(`${server}/users/`)

export const getAllMovimientos = () => api.get(defaultApiCajaChica);

export const createMovement = (data) => api.post(defaultApiCajaChica, data);

export const deleteMovement = (id) => api.delete(`${defaultApiCajaChica}${id}/`);

export const updateMovement = (id, task) => api.put(`${defaultApiCajaChica}${id}/`, task);

export const getMovement = (id) => api.get(`${defaultApiCajaChica}${id}/`);

export const getAllVehiculos = () => api.get(defaultApiVehiculos,);

export const createVehiculo = (task) => api.post(defaultApiVehiculos, task);

export const deleteVehiculo = (id) => api.delete(`${defaultApiVehiculos}${id}/`);

export const updateVehiculo = (id, task) => api.put(`${defaultApiVehiculos}${id}/`, task);

export const getAllVerificaciones = () => api.get(defaultApiVerificaciones);

export const createVerificacion = (task) => api.post(defaultApiVerificaciones, task);

export const deleteVerificacion = (id) => api.delete(`${defaultApiVerificaciones}${id}/`);

export const updateVerificacion = (id, task) => api.put(`${defaultApiVerificaciones}${id}/`, task);

export const getVerificacion = (id) => api.get(`${defaultApiVerificaciones}${id}/`);

export const getAllTenencias = () => api.get(defaultApiTenencias);

export const createTenencia = (task) => api.post(defaultApiTenencias, task);

export const deleteTenencia = (id) => defaultApiTenencias.delete(`${defaultApiTenencias}${id}/`);

export const updateTenencia = (id, task) => defaultApiTenencias.put(`${defaultApiTenencias}${id}/`, task);

export const getTenencia = (id) => defaultApiTenencias.get(`${defaultApiTenencias}${id}/`);

export const getVehiculo = (id) => defaultApiVehiculos.get(`${defaultApiTenencias}${id}/`);

export const getBalance = () => api.get(`${server}/cajachica/api/v1/balance/`);

export const getBalanceTotal = () => api.get(`${server}/cajachica/api/v1/balance_total/`);

export const getUltimosMovimientos = () => api.get(`${server}/cajachica/api/v1/ultimos_movimientos/`);

export const getGasolina = () => api.get(`${server}/cajachica/api/v1/movimientos_gasolina/`);

export const getTransacciones = () => api.get(`${server}/cajachica/api/v1/movimientos_transacciones/`);

export const getApoyos = () => api.get(`${server}/cajachica/api/v1/movimientos_apoyos/`);

export const getAnalisis = () => api.get(`${server}/cajachica/api/v1/analitics_data/`);

export const getFirstVerificaciones = () => api.get(`${server}/vehiculos/api/v1/first_verificaciones/`);