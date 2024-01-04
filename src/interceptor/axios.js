import axios from 'axios';

const server = "https://ganthausdjango.onrender.com"
const api = axios.create({
    baseURL: `${server}/token/refresh/`,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        console.log("Interceptor request");
        const token = localStorage.getItem('access_token');
        if (token) {
            console.log("Token exists");
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log("Interceptor response")

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("Try refresh token");
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await axios.post(`${server}/token/refresh/`, { refresh: refreshToken });
                const { access } = response.data;
                const { refresh } = response.data;

                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${access}`;
                console.log("Retry original request");
                return axios(originalRequest);
            } catch (error) {
                console.log("Refresh token error");
                // Handle refresh token error or redirect to login
                window.location.href = "/login";
            }
        }
        console.log("Interceptor error");
        return Promise.reject(error);
    }
);

export default api