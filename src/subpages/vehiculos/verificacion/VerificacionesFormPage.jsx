import { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import {
  createVerificacion,
  deleteVerificacion,
  getVerificacion,
  getAllVehiculos,
  updateVerificacion,
} from "../../../api/admin.api";
import {AwaitToast} from '../../../components/ui/AwaitToast';
import { useNavigate, useParams } from "react-router-dom";

export function VerificacionesFormPage({ setActualizar, actualizar, link }) {
  const [vehiculos, setVehiculos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      try {
        await AwaitToast({
          promise: updateVerificacion(params.id, data),
          loading: "Actualizando registro...",
          success: "Registro actualizado!",
          error: "Ha ocurrido un error",
        });
        navigate(link);
      } catch (error) {
        console.log("Ha sucedido un error:", error);
      }
    } else {
      try {
        await AwaitToast({
          promise: createVerificacion(data),
          loading: "Agregando registro...",
          success: "Registro agregado!",
          error: "Ha ocurrido un error",
        });
        Formulario.reset();
        setActualizar(!actualizar);
      } catch (error) {
        console.log("Ha sucedido un error:", error);
      }
    }
  });

  useEffect(() => {
    async function loadVerificacion() {
      if (params.id) {
        const res = await getVerificacion(params.id);
        setValue("vehiculo", res.data.vehiculo);
        setValue("fecha", res.data.fecha);
      }
    }
    loadVerificacion();
  }, []);

  useEffect(() => {
    async function loadVehiculos() {
      const res = await getAllVehiculos();
      setVehiculos(res.data);
    }
    loadVehiculos();
  }, []);

  return (
    <div className="justify-center w-full">
      <form onSubmit={onSubmit} className="p-2 mx-auto rounded-md my-1" id="Formulario">
        <div className="w-full">
          <label className="font-bold">Vehículo</label>
          <select
            className="mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-blue-50 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            autoComplete="off"
            defaultValue={"DEFAULT"}
            placeholder="Vehículo"
            {...register("vehiculo", { required: true })}
          >
            <option value="DEFAULT" disabled>
              Selecciona un vehículo [id, placa]
            </option>
            {errors.vehiculo && <span className="text-red-700">Este campo es requerido</span>}
            {vehiculos.map((vehiculo) => (
              <option value={vehiculo.id} key={vehiculo.id}>
                {vehiculo.id} - {vehiculo.placa}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-bold">Verificación</label>
          <input
            className="mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-blue-50 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="date"
            placeholder="Fecha de verificación"
            {...register("fecha", { required: true })}
          />
          {errors.fecha && <span className="text-red-700">Este campo es requerido</span>}
        </div>
        <div>
          <button className="py-2.5 px-5 me-2 mb-2 text-base text-gray-900 focus:outline-none bg-blue-300 rounded-lg border border-gray-200 focus:z-10 focus:ring-2 focus:ring-black font-bold w-full hover:bg-blue-200">
            Guardar
          </button>
        </div>
      </form>
      <div className="w-10/12 mx-auto">
        {params.id && (
          <button
            className="rounded-lg bg-red-400 text-black py-2.5 my-4 shadow-md px-4 inline-block align-baseline float-right w-full text-base font-bold hover:bg-red-200"
            onClick={async () => {
              const accepted = window.confirm(
                "Estas seguro de eliminar este registro?"
              );
              if (accepted) {
                await AwaitToast({
                  promise: deleteVerificacion(params.id),
                  loading: "Eliminando registro...",
                  success: "Registro eliminado!",
                  error: "Ha ocurrido un error",
                });
                navigate(link);
              }
            }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
