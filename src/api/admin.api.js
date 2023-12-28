import axios from 'axios'

const server = "http://localhost:8000"

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


export const getAllMovimientos = () => defaultApiCajaChica.get('/');

export const createMovement = (task) => defaultApiCajaChica.post('/', task);

export const deleteMovement = (id) => defaultApiCajaChica.delete(`/${id}/`);

export const updateMovement = (id, task) => defaultApiCajaChica.put(`/${id}/`, task);

export const getMovement = (id) => defaultApiCajaChica.get(`/${id}/`);

export const getAllVehiculos = () => defaultApiVehiculos.get('/');

export const createVehiculo = (task) => defaultApiVehiculos.post('/', task);

export const deleteVehiculo = (id) => defaultApiVehiculos.delete(`/${id}/`);

export const updateVehiculo = (id, task) => defaultApiVehiculos.put(`/${id}/`, task);

export const getAllVerificaciones = () => defaultApiVerificaciones.get('/');

export const createVerificacion = (task) => defaultApiVerificaciones.post('/', task);

export const deleteVerificacion = (id) => defaultApiVerificaciones.delete(`/${id}/`);

export const updateVerificacion = (id, task) => defaultApiVerificaciones.put(`/${id}/`, task);

export const getVerificacion = (id) => defaultApiVerificaciones.get(`/${id}/`);

export const getVehiculo = (id) => defaultApiVehiculos.get(`/${id}/`);

export const getBalance = () => axios.get(`${server}/cajachica/api/v1/balance/`);

export const getBalanceTotal = () => axios.get(`${server}/cajachica/api/v1/balance_total/`);

export const getUltimosMovimientos = () => axios.get(`${server}/cajachica/api/v1/ultimos_movimientos/`);

export const getGasolina = () => axios.get(`${server}/cajachica/api/v1/movimientos_gasolina/`);

export const getTransacciones = () => axios.get(`${server}/cajachica/api/v1/movimientos_transacciones/`);

export const getApoyos = () => axios.get(`${server}/cajachica/api/v1/movimientos_apoyos/`);

export const getAnalisis = () => axios.get(`${server}/cajachica/api/v1/analitics_data/`);

export const getFirstVerificaciones = () => axios.get(`${server}/vehiculos/api/v1/first_verificaciones/`);