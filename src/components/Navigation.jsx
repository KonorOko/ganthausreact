import { ButtonDrop } from "./ui/ButtonDrop";

export function Navigation() {
  const Menus = ["Modificar", "Análisis"];
  const MenusVehiculos = ["Modificar", "Verificaciones", "Tenencias"];
  return (
    <nav className="border-b font-medium border-blue-400 text-black text-lg shadow-md mb-2 md:px-1 bg-blue-400 sticky top-0 z-20">
      <div className="max-w-screen-xl flex flex-wrap items-end justify-end mx-auto py-1 px-2 md:mrl-0">
        <div className="mr-4 md:mr-0">
          <ul className="inline-flex rounded-md shadow-sm border border-blue-400 bg-blue-300" role="group">
            <li>
              <ButtonDrop
                props={Menus}
                name={"Caja Chica"}
                className={"px-5 py-1 text-sm md:text-base font-semibold text-gray-900 rounded-s-md hover:bg-blue-200"}
                links={[
                  "admin/cajachica/datapage/",
                  "admin/cajachica/analisis/",
                ]}
              />
            </li>
            <li>
              <ButtonDrop
                props={MenusVehiculos}
                name={"Vehículos"}
                className={"px-5 py-1 text-sm md:text-base font-semibold text-gray-900 rounded-e-md hover:bg-blue-200"}
                links={[
                  "admin/vehiculos/datapage/",
                  "admin/vehiculos/verificaciones/",
                  "admin/vehiculos/tenencias/"
                ]}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
