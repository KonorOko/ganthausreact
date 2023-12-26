import axios from "axios";
import { useState, useEffect } from "react";

export const Login = () => {

  useEffect(() => {
    localStorage.clear();
    axios.defaults.headers.common["Authorization"] = null;
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    const { data } = await axios.post(
      "https://ganthausdjango.onrender.com/token/",
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );

    console.log(data);
    localStorage.clear();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-blue-50">
      <div className="fw-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 w-96 h-72">
        <form className="space-y-4 md:space-y-6" onSubmit={submit}>
          <div className="px-4">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl my-5">Login</h3>
            <div >
              <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="username">
                Username
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter Username"
                name="username"
                type="text"
                id="username"
                autoComplete="name"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="password">
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="border rounded-md p-2 w-20 bg-blue-200"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
