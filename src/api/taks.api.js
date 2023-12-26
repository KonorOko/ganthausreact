import axios from 'axios'

const defaultApi = axios.create({
    baseURL: 'https://ganthausdjango.onrender.com/cajachica/api/v1/movimientos/'
})

export const getAllMovimientos = () => defaultApi.get('/');

export const createMovement = (task) => defaultApi.post('/', task);

export const deleteMovement = (id) => defaultApi.delete(`/${id}/`);

export const updateMovement = (id, task) => defaultApi.put(`/${id}/`, task);

export const getMovement = (id) => defaultApi.get(`/${id}/`);

export const getBalance = () => axios.get('https://ganthausdjango.onrender.com/cajachica/api/v1/balance/');

export const getBalanceTotal = () => axios.get('https://ganthausdjango.onrender.com/cajachica/api/v1/balance_total/');

export const getUltimosMovimientos = () => axios.get('https://ganthausdjango.onrender.com/cajachica/api/v1/ultimos_movimientos/');

export const getGasolina = () => axios.get('https://ganthausdjango.onrender.com/cajachica/api/v1/movimientos_gasolina/');

export const getTransacciones = () => axios.get('https://ganthausdjango.onrender.com/cajachica/api/v1/movimientos_transacciones/');

export const getApoyos = () => axios.get('https://ganthausdjango.onrender.com/cajachica/api/v1/movimientos_apoyos/');


export const getAnalisis = () => axios.get('https://ganthausdjango.onrender.com/cajachica/api/v1/analitics_data/');