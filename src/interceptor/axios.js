import axios from 'axios';

const server = "https://ganthausdjango.onrender.com"
const api = axios.create({
    baseURL: `${server}/token/refresh/`,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
  
    failedQueue = [];
  };
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
            if (isRefreshing) {
                console.log("Adding request to queue")
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axios(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }


            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refresh_token');
            return api.post(`${server}/token/refresh/`, { refresh: refreshToken })
              .then(({data}) => {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                console.log("Tokens saved")
                originalRequest.headers.Authorization = `Bearer ${data.access}`;
                processQueue(null, data.access);
                return axios(originalRequest);
              })
              .catch(err => {
                processQueue(err, null);
                console.log("Refresh token error");
                window.location.href = "/login";
                return Promise.reject(err);
              })
              .finally(() => { isRefreshing = false });
          }
      
          console.log("Interceptor error");
          return Promise.reject(error);
        }
      );
export default api