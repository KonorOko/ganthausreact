import axios from "axios";
import { useState, useEffect } from "react";
import { AwaitToastCustom } from './components/ui/AwaitToast';
import { loginToken } from './api/admin.api';

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

    const data = await AwaitToastCustom(
      {
        promise: loginToken(user),
        loading: "Iniciando sesión...",
        success: "Sesión iniciada!",
        error: "No se pudo ingresar al sistema",
      }
    )
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 md:py-8 mx-auto h-screen lg:py-0 bg-blue-50">
      <div className="fw-full bg-white rounded-lg shadow dark:border mt-0 md:max-w-md xl:p-0 w-96 md:h-72 h-screen">
        <form className="md:space-y-6 mt-2 mx-1" onSubmit={submit}>
          <div className="px-4">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl my-5">Login</h3>
            <div >
              <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="username">
                Usuario
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Agregar usuario"
                name="username"
                type="text"
                id="username"
                autoComplete="name"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="password">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Ingresar contraseña"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="border rounded-md p-2 w-24 bg-blue-200"
              >
                Confirmar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
