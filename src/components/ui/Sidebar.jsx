import { MoreVertical, ChevronFirst, ChevronLast, Users } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/ganthaus-distribuidora-380.jpg";
const SidebarContext = createContext();

export function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <aside className="fixed sm:top-0 left-0 z-40 sm:transition-transform sm:translate-x-0 sm:h-full bottom-0 w-full">
      <nav
        className={`sm:h-full sm:flex sm:flex-col bg-white border-r shadow-sm transition-all grid ${
          expanded ? "sm:w-64" : "sm:w-18"
        }`}
      >
        <div className="p-4 pb-10 mt-3 sm:flex justify-between items-center hidden sm:visible">
          <img
            src={Logo}
            className={`overflow-hidden transition-all ${
              expanded ? "sm:w-40" : "sm:w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="sm:flex-1 px-3 sm:flex sm:flex-col grid grid-cols-7">{children}</ul>
        </SidebarContext.Provider>

      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, alert, link }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <NavLink
      to={link}
      className={`relative flex items-center py-2 px-3 my-1
    font-medium rounded-md cursor-pointer
    transition-colors group hover:bg-blue-50 text-gray-600`}
    >
      {icon}
      <span
        className={`sm:overflow-hidden sm:transition-all hidden sm:flex ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-blue-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-blue-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 hidden sm:visible`}
        >
          {text}
        </div>
      )}
    </NavLink>
  );
}
