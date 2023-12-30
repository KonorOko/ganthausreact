import { Link } from "react-router-dom";
import { ButtonDrop } from "./ui/ButtonDrop";
export function Navigation() {
  const Menus = ["Modificar", "Análisis"];
  const MenusVehiculos = ["Modificar", "Verificaciones"];
  return (
    <nav className="border-b font-medium border-blue-400 text-black text-lg shadow-md mb-2 md:px-1 bg-blue-400 sticky top-0 z-20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:mrl-0">
        <Link
          className="shadow-lg ml-4 md:ml-0 hover:text-blue-50 text-base md:text-lg rounded-lg bg-blue-300 md:px-8 px-4 mt-auto"
          to="/admin"
        >
          Inicio
        </Link>
        <div className="mr-4 md:mr-0">
          <ul className="flex flex-row ">
            <li className="md:mx-2">
              <ButtonDrop
                props={Menus}
                name={"Caja Chica"}
                links={[
                  "admin/cajachica/datapage/",
                  "admin/cajachica/analisis/",
                ]}
              />
            </li>
            <li className="md:mx-2 mx-1">
              <ButtonDrop
                props={MenusVehiculos}
                name={"Vehículos"}
                links={[
                  "admin/vehiculos/datapage/",
                  "admin/vehiculos/verificaciones/",
                ]}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
