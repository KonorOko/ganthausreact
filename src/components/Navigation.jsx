import { ButtonDrop } from "./ui/ButtonDrop";

export function Navigation() {
  const Menus = ["Modificar", "Análisis"];
  const MenusVehiculos = ["Modificar", "Verificaciones", "Servicios", "Tenencias"];
  return (
    <nav className="border-b font-medium border-blue-400 text-black text-lg shadow-md mb-2 bg-blue-400 sticky top-0 z-20">
      <div className="max-w-screen-xl flex flex-wrap items-end justify-end ml-auto p-1 md:px-10">
        <ul
          className="inline-flex rounded-md shadow-sm border border-blue-400 bg-blue-300"
          role="group"
        >
          <li>
            <ButtonDrop
              props={Menus}
              name={"Caja Chica"}
              className={
                "px-5 py-1 text-sm md:text-base font-semibold text-gray-900 rounded-s-md hover:bg-blue-200"
              }
              links={["admin/cajachica/datapage/", "admin/cajachica/analisis/"]}
            />
          </li>
          <li>
            <ButtonDrop
              props={MenusVehiculos}
              name={"Vehículos"}
              className={
                "px-5 py-1 text-sm md:text-base font-semibold text-gray-900 hover:bg-blue-200"
              }
              links={[
                "admin/vehiculos/datapage/",
                "admin/vehiculos/verificaciones/",
                "admin/vehiculos/servicios/",
                "admin/vehiculos/tenencias/",
              ]}
            />
          </li>
          <li>
            <ButtonDrop
              props={["..."]}
              name={"Clientes"}
              className={
                "px-5 py-1 text-sm md:text-base font-semibold text-gray-900 rounded-e-md hover:bg-blue-200"
              }
              links={""}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}
