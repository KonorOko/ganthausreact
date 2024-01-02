import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createVehiculo,
  deleteVehiculo,
  updateVehiculo,
  getVehiculo,
} from "../../../api/admin.api";
import { AwaitToast } from '../../../components/ui/AwaitToast';
import { useNavigate, useParams } from "react-router-dom";

export function VehiculosFormPage({ setActualizar, actualizar, link }) {
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
          promise: updateVehiculo(params.id, data),
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
        if (data.modelo === "") {
          delete data.modelo;
        }
        if (data.año === "") {
          delete data.año;
        }
        if (data.placa === "") {
          delete data.placa;
        }
        await AwaitToast({
          promise: createVehiculo(data),
          loading: "Agregando registro...",
          success: "Registro agregado!",
          error: "Ha ocurrido un error",
        });
        setActualizar(!actualizar);
      } catch (error) {
        console.log("Ha sucedido un error:", error);
      }
    }
  });

  useEffect(() => {
    async function loadVehiculo() {
      if (params.id) {
        const res = await getVehiculo(params.id);
        setValue("id", res.data.id);
        setValue("modelo", res.data.modelo);
        setValue("año", res.data.año);
        setValue("placa", res.data.placa);
      }
    }
    loadVehiculo();
  }, []);


  return (
    <div className="justify-center w-full">
      <form onSubmit={onSubmit} className="p-2 mx-auto rounded-md my-1">
        <div className="w-full">
          <label className="font-bold">Número</label>
          <input
            className="mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-blue-50 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            autoComplete="off"
            autoFocus={true}
            step={0.01}
            placeholder="Número del vehículo"
            {...register("id", { required: true })}
          />
          {errors.id && <span className="text-red-700">Este campo es requerido</span>}
        </div>
        <div>
          <label className="font-bold">Modelo</label>
          <input
            className="mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-blue-50 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            placeholder="Modelo del vehículo"
            {...register("modelo")}
          />
        </div>
        <div>
          <label className="font-bold">Año</label>
          <input
            className="mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-blue-50 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Año del vehículo"
            type='number'
            {...register("año")}
          />
        </div>
        <div>
          <label className="font-bold">Placa</label>
          <input
            className="mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-blue-50 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Placa del vehículo"
            type='text'
            {...register("placa")}
          />
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
                  promise: deleteVehiculo(params.id),
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
