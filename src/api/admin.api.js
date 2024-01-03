import axios from 'axios'

const server = "https://ganthausdjango.onrender.com"

const production = "https://ganthausdjango.onrender.com"

const defaultApiCajaChica = axios.create({
    baseURL: `${server}/cajachica/api/v1/movimientos/`
})
const defaultApiVehiculos = axios.create({
    baseURL: `${server}/vehiculos/api/v1/vehiculos/`
})

const defaultApiVerificaciones = axios.create({
    baseURL: `${server}/vehiculos/api/v1/verificaciones/`
})

const defaultApiTenencias = axios.create({
    baseURL: `${server}/vehiculos/api/v1/tenencias/`
})

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
            localStorage.clear();
            localStorage.setItem("access_token", data.data.access);
            localStorage.setItem("refresh_token", data.data.refresh);
            localStorage.setItem("username", data.data.username)
            localStorage.setItem("role", data.data.groups[0])
            axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
            window.location.href = "/";
        } else {
            throw new Error("Ha ocurrido un error");
        }
    }
    )

export const User = (token) => axios.get(`${server}/users/`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
})

export const getAllMovimientos = () => defaultApiCajaChica.get('/', {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
});

export const createMovement = (data) => defaultApiCajaChica.post('/', data, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
});

export const deleteMovement = (id) => defaultApiCajaChica.delete(`/${id}/`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
});

export const updateMovement = (id, task) => defaultApiCajaChica.put(`/${id}/`, task, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
});

export const getMovement = (id) => defaultApiCajaChica.get(`/${id}/`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
});

export const getAllVehiculos = () => defaultApiVehiculos.get('/',);

export const createVehiculo = (task) => defaultApiVehiculos.post('/', task);

export const deleteVehiculo = (id) => defaultApiVehiculos.delete(`/${id}/`);

export const updateVehiculo = (id, task) => defaultApiVehiculos.put(`/${id}/`, task);

export const getAllVerificaciones = () => defaultApiVerificaciones.get('/');

export const createVerificacion = (task) => defaultApiVerificaciones.post('/', task);

export const deleteVerificacion = (id) => defaultApiVerificaciones.delete(`/${id}/`);

export const updateVerificacion = (id, task) => defaultApiVerificaciones.put(`/${id}/`, task);

export const getVerificacion = (id) => defaultApiVerificaciones.get(`/${id}/`);

export const getAllTenencias = () => defaultApiTenencias.get('/');

export const createTenencia = (task) => defaultApiTenencias.post('/', task);

export const deleteTenencia = (id) => defaultApiTenencias.delete(`/${id}/`);

export const updateTenencia = (id, task) => defaultApiTenencias.put(`/${id}/`, task);

export const getTenencia = (id) => defaultApiTenencias.get(`/${id}/`);

export const getVehiculo = (id) => defaultApiVehiculos.get(`/${id}/`);

export const getBalance = () => axios.get(`${server}/cajachica/api/v1/balance/`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
});

export const getBalanceTotal = () => axios.get(`${server}/cajachica/api/v1/balance_total/`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
});

export const getUltimosMovimientos = () => axios.get(`${server}/cajachica/api/v1/ultimos_movimientos/`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
});

export const getGasolina = () => axios.get(`${server}/cajachica/api/v1/movimientos_gasolina/`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
});

export const getTransacciones = () => axios.get(`${server}/cajachica/api/v1/movimientos_transacciones/`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
});

export const getApoyos = () => axios.get(`${server}/cajachica/api/v1/movimientos_apoyos/`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
});

export const getAnalisis = () => axios.get(`${server}/cajachica/api/v1/analitics_data/`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }
});

export const getFirstVerificaciones = () => axios.get(`${server}/vehiculos/api/v1/first_verificaciones/`);