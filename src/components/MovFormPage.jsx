import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createMovement,
  deleteMovement,
  updateMovement,
  getMovement,
} from "../api/taks.api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function MovFormPage({ setActualizar, actualizar }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const toastCreateSuccess = () => toast.success("Registro agregado!");
  const toastUpdateSuccess = () => toast.success("Registro actualizado!");
  const toastDeleteSuccess = () => toast.success("Registro eliminado!");
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      try {
        await updateMovement(params.id, data);
        toastUpdateSuccess();
        navigate("/admin/cajachica/datapage");
      } catch (error) {
        console.log("Ha sucedido un error:", error);
      }
    } else {
      try {
        await createMovement(data);
        setActualizar(!actualizar);
        toastCreateSuccess();
      } catch (error) {
        console.log("Ha sucedido un error:", error);
      }
    }
  });

  useEffect(() => {
    async function loadMovement() {
      if (params.id) {
        const res = await getMovement(params.id);
        setValue("cantidad", res.data.cantidad);
        setValue("motivo", res.data.motivo);
        setValue("fecha", res.data.fecha);
      }
    }
    loadMovement();
  }, []);

  const obtenerFechaActual = () => {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    return today;
  };

  return (
    <div className="justify-center w-full">
      <form onSubmit={onSubmit} className="p-2 mx-auto rounded-md my-1">
        <div className="w-full">
          <label className="font-bold">Cantidad de la transacción</label>
          <input
            className="mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-blue-50 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="number"
            autoComplete="off"
            autoFocus={true}
            step={0.01}
            placeholder="Cantidad"
            {...register("cantidad", { required: true })}
          />
          {errors.Cantidad && <span>Este campo es requerido</span>}
        </div>
        <div>
          <label className="font-bold">Motivo</label>
          <input
            className="mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-blue-50 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            placeholder="Motivo"
            {...register("motivo", { required: true })}
          />
          {errors.Motivo && <span>Este campo es requerido</span>}
        </div>
        <div>
          <label className="font-bold">Fecha</label>
          <input
            className="mb-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-blue-50 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="date"
            defaultValue={obtenerFechaActual()}
            {...register("fecha", { required: true })}
          />
          {errors.Fecha && <span>Este campo es requerido</span>}
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
                await deleteMovement(params.id);
                toastDeleteSuccess();
                navigate("/admin/cajachica/datapage");
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