import { MoreVertical, ChevronFirst, ChevronLast, Users } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/ganthaus-distribuidora-380.jpg";
const SidebarContext = createContext();

export function Sidebar({ children, username = "none", role = "none"}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <aside className="fixed md:top-0 left-0 z-40 transition-transform translate-x-0 md:h-full bottom-0 w-full md:w-auto">
      <nav
        className={`md:h-full md:flex md:flex-col bg-white border-r shadow-md transition-all grid h-16 ${
          expanded ? "md:w-64" : "md:w-18"
        }`}
      >
        <div className="p-4 pb-10 mt-3 md:flex justify-between items-center hidden md:visible">
          <img
            src={Logo}
            className={`overflow-hidden transition-all ${
              expanded ? "md:w-40" : "md:w-0"
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
          <ul className="md:flex-1 px-3 md:flex md:flex-col grid grid-cols-7">
            {children}
          </ul>
        </SidebarContext.Provider>
        <div className="border-t md:flex p-3 hidden">
          <img
            src={`https://ui-avatars.com/api/?name=${username}&background=6bccf2`}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{username}</h4>
              <span className="text-xs text-gray-600">{role}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
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
    transition-colors group hover:bg-blue-50 text-gray-600 justify-center`}
    >
      {icon}
      <span
        className={`md:overflow-hidden md:transition-all hidden md:flex ${
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
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-blue-800 text-md invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 hidden md:flex`}
        >
          {text}
        </div>
      )}
    </NavLink>
  );
}
