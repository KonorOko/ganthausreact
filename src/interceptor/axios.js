import axios from "axios";
import { Navigate } from "react-router-dom";

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    console.log("---Intercepted---")
    if (error.response.status === 401 && !refresh) {
        refresh = true;
        console.log("---Refreshing---")
        const response = await axios.post('https://ganthausdjango.onrender.com/token/refresh/', {
            refresh:localStorage.getItem('refresh_token')
        }, {
            headers: {
              'Content-Type': 'application/json',
            }
          },{withCredentials: true}).then((data) => {
            if (data.status === 200) {
                console.log("---Refresh---")
                console.log(data.data)
                localStorage.clear();
                localStorage.setItem("access_token", data.data.access);
                localStorage.setItem("refresh_token", data.data.refresh);
                axios.defaults.headers.common["Authorization"] = `Bearer ${data.data["access"]}`;
                console.log("Refresh exitoso")
                const originalRequest = error.config;
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
      
                console.log("---Reattempting original request---");
                return axios(originalRequest);
            }}).catch((err) => {
                console.log("Error refreshing token")
                Navigate("/logout");
                throw new Error("Ha ocurrido un error:", err);
            }).finally(() => {
                console.log("Finally")
                refresh = false;
            });
        return response;
    }
    console.log("Not Refreshing");
    refresh = false;
    return Promise.reject(error)
})

