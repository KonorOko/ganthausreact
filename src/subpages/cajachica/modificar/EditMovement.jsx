import { MovFormPage } from "./MovFormPage";
import { Navigation } from "../../../components/Navigation";
export function EditMovement() {
  return (
    <div className="md:ml-16">
      <Navigation />
      <div className="my-2 md:px-5 py-2 min-h-screen">
        <div className="rounded-md bg-white shadow-md mb-3 p-1">
          <h1 className="p-2 w-10/12 font-bold text-3xl">Edita el registro</h1>
        </div>
        <div className="border rounded-md shadow-md mb-3 bg-white">
          <MovFormPage />
        </div>
      </div>
    </div>
  );
}
