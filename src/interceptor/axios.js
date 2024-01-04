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
                localStorage.setItem("username", data.data.username)
                localStorage.setItem("role", data.data.groups[0])
                axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
                console.log("Refresh exitoso")
                return data
            }}).catch((err) => {
                Navigate("/logout");
                throw new Error("Ha ocurrido un error:", err);
            });
    }
    console.log("Not Refreshing");
    refresh = false;
    return Promise.reject(error)
})

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        // If the error is a 401 and we have a refresh token, refresh the JWT token
        if (
            error.response.status === 401 &&
            sessionStorage.getItem("refreshToken")
        ) {
            const refreshToken = sessionStorage.getItem("refreshToken");

            let data = JSON.stringify({
                refresh_token: refreshToken,
            });

            post("/refreshToken", data)
                .then((response) => {
                    sessionStorage.setItem("jwtToken", response.token);
                    sessionStorage.setItem("refreshToken", response.refresh_token);

                    // Re-run the original request that was intercepted
                    originalRequest.headers.Authorization = `Bearer ${response.token}`;
                    api(originalRequest)
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    // return api(originalRequest)
                })
                .catch((err) => {
                    // If there is an error refreshing the token, log out the user
                    console.log(err);
                });
        }

        // Return the original error if we can't handle it
        return Promise.reject(error);
    }
);
