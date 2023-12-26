import { Link } from "react-router-dom";
import { ButtonDrop } from "./ui/ButtonDrop";
export function Navigation() {
  const Menus = ["Modificar", "Análisis"];
  const MenusVehiculos = ["Modificar", "Verificaciones"];
  return (
    <nav className="border-b font-medium border-blue-400 text-black text-lg shadow-md mb-2 px-1 bg-blue-400 sticky top-0 z-20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link
          className="font-bold text-lg hover:text-blue-50 rounded-md bg-blue-300 px-8"
          to="/admin"
        >
          Inicio
        </Link>
        <div>
          <ul className="flex flex-row ">
            <li className="mx-2">
              <ButtonDrop
                props={Menus}
                name={"Caja Chica"}
                links={[
                  "admin/cajachica/datapage/",
                  "admin/cajachica/analisis",
                ]}
              />
            </li>
            <li className="mx-2">
              <ButtonDrop
                props={MenusVehiculos}
                name={"Vehículos"}
                links={[
                  "admin/cajagrande/datapage/",
                  "admin/cajagrande/analisis",
                ]}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
